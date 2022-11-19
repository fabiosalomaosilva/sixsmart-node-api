export interface User {
  id?: string;
  userId?: string;
  name?: string;
  email: string;
  password: string;
  photoUrl?: string;
  role: 'Cliente' | 'Administrador';
  emailVerified: boolean;
  provider: string;
}

export interface UserModelDto {
  name?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  picture?: string;
  role?: 'Cliente' | 'Administrador';
  email_verified?: boolean;
  locale?: string;
}
