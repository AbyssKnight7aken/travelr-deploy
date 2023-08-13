import { User } from './user';

export interface Log {
  name: string;
  date: string;
  description: string;
  img: {
    data: {
      data: Node
    }
  };
  location: string;
  commentList: [];
  _id?: string;
  _ownerId: User;
  created_at: string;
  updatedAt: string;
  __v: number;
}