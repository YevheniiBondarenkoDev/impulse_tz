import { IsBoolean } from 'class-validator';

export class LogoutResponse {
  @IsBoolean()
  success: boolean;
}
