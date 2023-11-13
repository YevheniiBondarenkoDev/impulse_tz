import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { TokenData } from './types';
import { AuthDto } from './dto/auth.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  generateToken(tokenData: TokenData): string {
    return this.jwtService.sign(tokenData);
  }
  async login({ email, password }: AuthDto) {
    const user = await this.usersService.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('There was a problem with your login');
    }
    const isAuthenticPassword = await bcrypt.compare(password, user.password);
    if (!isAuthenticPassword) {
      throw new UnauthorizedException('There was a problem with your login');
    }
    const sessionToken = uuid();
    const accessToken = this.generateToken({
      userId: user.id,
      sessionToken,
    });
    await this.usersService.update({ id: user.id }, { sessionToken });
    return {
      accessToken,
      user: {
        email: user.email,
        id: user.id,
      },
    };
  }
  async signUp({ email, password }: AuthDto) {
    const user = await this.usersService.findOne({ where: { email } });
    if (user) {
      throw new BadRequestException('User with given email already exists');
    }
    const sessionToken = uuid();
    const createdUser = await this.usersService.create({
      password,
      email,
      sessionToken,
    });
    const accessToken = this.generateToken({
      userId: createdUser.id,
      sessionToken,
    });
    return {
      accessToken,
      user: {
        email: createdUser.email,
        id: createdUser.id,
      },
    };
  }
  async logout(userId: number) {
    const updateResult = await this.usersService.update(
      { id: userId },
      { sessionToken: null },
    );
    return { success: updateResult.affected === 1 };
  }
}
