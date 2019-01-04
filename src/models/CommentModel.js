import BaseModel, { COMMON_SCHEMAS } from './BaseModel';

const { STRING, DATE, OBJECT } = COMMON_SCHEMAS;

export default class CommentModel extends BaseModel {
  static dataValidator() {
    return {
      userId: OBJECT,
      postId: OBJECT,
      comment: STRING,
      createdAt: DATE,
    }; 
  }
}
