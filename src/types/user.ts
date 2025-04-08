export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  image: string;
  refreshToken: string;
  accessToken: string;
}


export interface AuthUser extends User {
  accessToken: string;
  refreshToken: string;
  tokenExpiry: number;
}