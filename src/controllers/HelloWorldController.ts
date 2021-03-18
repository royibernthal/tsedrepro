import {Controller, Inject, Post} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {Returns} from "@tsed/schema";
import { Types } from 'mongoose';

import TestGender from "../schemas/TestGender";
import TestInterestsObject from '../schemas/TestInterestsObject';
import TestUser from "../schemas/TestUser";

class CustomResponse {
  id: string;
  name: string;
  interests: string[];
}

@Controller("/")
export class HelloWorldController {

  @Inject(TestUser)
  private TestUser: MongooseModel<TestUser>;

  @Inject(TestGender)
  private TestGender: MongooseModel<TestGender>;

  @Post("/create")
  @Returns(201, CustomResponse) // ! important now with v6 it's preferable to add this decorator for json-mapper (mostly when you use Mongoose)
  async create() {
    const genderA = await this.createGender();
    const genderB = await this.createGender();

    let user = new this.TestUser(new TestUser());

    user.name = this.randomLabel("user");
    user.interests = [];
    user.interests_object = new TestInterestsObject();

    user = await user.save();

    user.interests.push( Types.ObjectId(genderA._id.toString()) as any );
    user.interests.push(genderB._id);

    user.interests_object['gender_a'] = Types.ObjectId(genderA._id.toString()) as any;
    user.interests_object['gender_b'] = genderB._id;

    user = await user.save();

    return user;
  }

  private async createGender() {
    const gender = new this.TestGender(new TestGender());

    gender.label = this.randomLabel("gender");

    return await gender.save();
  }

  private randomLabel(label: string): string {
    return label + "_" + Math.floor(Math.random() * 10000000000);
  }

}
