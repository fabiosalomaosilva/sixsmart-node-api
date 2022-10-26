export interface UserCreateDto {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface TokenPayload {
  email?: string;
  name?: string;
  photoUrl?: string;
  role?: string;
  access_data?: string;
  emailIsValid?: boolean;
  id?: string;
}

export interface CreateUserResult {
  email: string;
  name?: string;
  role?: string;
}

export interface ChangePasswordDto {
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
