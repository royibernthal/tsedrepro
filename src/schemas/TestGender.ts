import {Model, ObjectID} from "@tsed/mongoose";
import {Property} from "@tsed/schema";
import {Document} from "mongoose";

export type GenderDoc = TestGender & Document;

@Model()
export default class TestGender {
  @ObjectID("id")
  _id: string;

  @Property()
  label: string;
}