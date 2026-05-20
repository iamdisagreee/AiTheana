export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}

export interface UserSchema {
  user?: User;
  access_token?: string;
  token_type?: string;
  _inited?: boolean;
}
