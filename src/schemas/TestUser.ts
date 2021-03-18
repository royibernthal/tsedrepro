import { Model, ObjectID, Ref } from '@tsed/mongoose';
import { Property } from '@tsed/schema';

import TestGender from './TestGender';
import TestInterestsObject from './TestInterestsObject';

@Model()
export default class TestUser {
  @ObjectID('id')
  _id: string;

  @Property()
  name: string;
  
  @Ref(TestGender)
  interests: Ref<TestGender>[];

  @Property()
  interests_object: TestInterestsObject;
}