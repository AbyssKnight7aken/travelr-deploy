import { Log } from './log';
import { User } from './user';

export interface Post {
  likes: string[];
  _id: string;
  text: string;
  userId: User;
  themeId: Log;
  created_at: string;
  updatedAt: string;
  __v: number;
}