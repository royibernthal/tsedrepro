import { Controller, Inject, Post } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';

import TestGender from '../schemas/TestGender';
import TestUser from '../schemas/TestUser';

@Controller('/')
export class HelloWorldController {
  
  @Inject(TestUser)
  private TestUser: MongooseModel<TestUser>;

  @Inject(TestGender)
  private TestGender: MongooseModel<TestGender>;

  @Post('/create')
  async create() {
    const gender = new this.TestGender( new TestGender() );
    const user = new this.TestUser( new TestUser() );

    gender.label = 'gender_' + Math.floor( Math.random() * 10000000000 );

    await gender.save();

    user.name = 'user_' + Math.floor( Math.random() * 10000000000 );
    user.interests = [gender._id];

    await user.save();

    return {
      id: user.id,
      name: user.name,
      interests: user.interests
    };
  }
}
