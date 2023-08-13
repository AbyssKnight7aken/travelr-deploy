export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  img: {
    data: {
      data: Node
    }
  };
  logs: string[];
  __v: number;
}