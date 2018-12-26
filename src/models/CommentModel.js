import BaseModel, { COMMON_SCHEMAS } from './BaseModel';

const { STRING } = COMMON_SCHEMAS;

export default class CommentModel extends BaseModel {
  static dataValidator() {
    return {
      userId: STRING,
      postId: STRING,
      comment: STRING,
    }; 
  }
}
