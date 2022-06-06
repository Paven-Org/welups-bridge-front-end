export interface LoginUser {
  username: string;
  password: string;
}

export interface User {
  new_username?: string;
  id?: number;
  username?: string;
  email?: string;
  status?: string;
  password?: string;
}

export interface Role {
  name: string;
}
