export interface UserCreateDto {
  email: string;
  photoUrl?: string;
  password: string;
  confirmPassword: string;
  name: string;
  provider: string;
  userId: string;
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
  userId?: string;
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

export interface ForgotPasswordDto {
  email: string;
}

export interface ResponseDefault {
  success: boolean;
  errorMessage?: string;
  message?: string;
}

export interface LoginSocialDto {
  email: string;
  userId: string;
}
