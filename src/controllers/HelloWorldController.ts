import {Controller, Inject, Post} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {Returns} from "@tsed/schema";

import TestGender from "../schemas/TestGender";
import TestUser from "../schemas/TestUser";

@Controller("/")
export class HelloWorldController {

  @Inject(TestUser)
  private TestUser: MongooseModel<TestUser>;

  @Inject(TestGender)
  private TestGender: MongooseModel<TestGender>;

  @Post("/create")
  @Returns(201, TestUser) // ! important now with v6 it's preferable to add this decorator for json-mapper (mostly when you use Mongoose)
  async create() {
    const gender = new this.TestGender(new TestGender());
    const user = new this.TestUser(new TestUser());

    gender.label = "gender_" + Math.floor(Math.random() * 10000000000);

    await gender.save();

    user.name = "user_" + Math.floor(Math.random() * 10000000000);
    user.interests = [gender._id];

    await user.save();

    return user; // Isn't necessary to map the model.
  }
}
