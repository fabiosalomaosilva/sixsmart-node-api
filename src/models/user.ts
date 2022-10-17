export interface User {
  id?: string;
  name?: string;
  email: string;
  password: string;
  photoUrl?: string;
  role: 'Cliente' | 'Administrador';
  emailVerified: boolean;
}
