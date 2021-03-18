import { Schema, Ref } from '@tsed/mongoose';

import TestGender from './TestGender';

@Schema({ schemaOptions: { _id: false } })
export default class TestInterestsObject {

  @Ref(TestGender)
  gender_a: string;

  @Ref(TestGender)
  gender_b: string;

}