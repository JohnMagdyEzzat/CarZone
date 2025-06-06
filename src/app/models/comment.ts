export interface IComment {
  id: number;
  user_id: number;
  body: string;
  created_at: string;
  updated_at: string;
  isEdit?:boolean;
}

export interface ICommentCreation {
  user_id: number;
  body: string;
}

export interface ICommentCreationResponse {
  message: string;
  comment: {
    user_id: number;
    body: string;
    updated_at: string;
    created_at: string;
    id: number;
  };
}

export interface ICommentUpdate {
  user_id: number;
  body: string;
}
