import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class AuthDto {
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
class UserAuthResponse {
  @IsEmail()
  email: string;
  @IsInt()
  id: number;
}
export class AuthResponse {
  @Type(() => UserAuthResponse)
  user: UserAuthResponse;
  @IsString()
  accessToken: string;
}
