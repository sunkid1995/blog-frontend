import BaseModel, { COMMON_SCHEMAS } from './BaseModel';

const { STRING, DATE, OBJECT, ARRAY } = COMMON_SCHEMAS;

export default class PostModel extends BaseModel {
  static dataValidator() {
    return {
      _id: STRING,
      author: OBJECT,
      comments: ARRAY,
      likes: ARRAY,
      content: STRING,
      image: STRING,
      createdAt: DATE,
    };
  }
}
