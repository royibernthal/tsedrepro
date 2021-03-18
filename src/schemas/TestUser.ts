import { Model, ObjectID, Ref } from '@tsed/mongoose';
import { Property } from '@tsed/schema';

import TestGender from './TestGender';

@Model()
export default class TestUser {

  @ObjectID('id')
  _id: string;

  @Property()
  name: string;
  
  @Ref(TestGender)
  interests: Ref<TestGender>[];

}