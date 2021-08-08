export class Tables {
  public static readonly USER = "users";
  public static readonly TOPIC = "topics";
  public static readonly POST = "posts";
  public static readonly ATTECHMENT = "attachments";
  public static readonly COMMENTS = "comments";
}

export enum USER_TABLE {
  ID = 'id',
  FIRSTNAME = 'firstname',
  LASTNAME = 'lastname',
  EMAIL = 'email',
  PASSWORD = 'password',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt'
}

export enum TOPIC_TABLE {
  ID = 'id',
  NAME = 'name',
  DESCRIPTION = 'description',
  USERID = 'userId',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt'
}

export enum POST_TABLE {
  ID = 'id',
  USERID = 'userId',
  TOPICID = 'topicId',
  DETAILS = 'details',
  IMAGES = 'images',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt'
}

export enum ATTECHMENT_TABLE {
  ID = 'id',
  IMAGEPATH = 'imagePath',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt'
}

export enum COMMENT_TABLE {
  ID = 'id',
  COMMENT = 'comment',
  USERID = 'userId',
  POSTID = 'postId',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt'
}






