import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentialsAttrs } from './attrs/user-credentials.attrs';
import { UserRepository } from './models/user.repository';
import * as argon from 'argon2';
import { AuthPayloadType } from './types/auth-payload.type';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  getHello(): string {
    return 'auth service up';
  }

  async signup(data: UserCredentialsAttrs) {
    const hashedPassword = await this.hashPassword(data.password);
    const existingUser = await this.userRepository.findOne({
      email: data.email,
    });
    if (existingUser) {
      throw new BadRequestException(
        'email already in use, try signing up with a different email id',
      );
    }
    const user = this.userRepository.create({
      email: data.email,
      password: hashedPassword,
    });
    await user.save();
    return 'signed up successfully, now go to login';
  }

  async signin(data: UserCredentialsAttrs) {
    const user = await this.userRepository.findOne({
      email: data.email,
    });
    if (!user) {
      throw new NotFoundException(
        'account associated with entered email not found',
      );
    }
    const isVerified = await this.verifyPassword(user.password, data.password);
    if (!isVerified) {
      throw new UnauthorizedException(
        'entered password doesnt match with account associated',
      );
    }
    const token = this.getToken({
      id: user.id,
      email: user.email,
    });
    return {
      token,
      id: user.id,
      email: user.email,
    };
  }

  async hashPassword(passwordToHash: string) {
    const hashedPassword = await argon.hash(passwordToHash);
    return hashedPassword;
  }

  async verifyPassword(storedPassword: string, enteredPassword: string) {
    const isVerified = await argon.verify(storedPassword, enteredPassword);
    return isVerified;
  }

  getToken(payload: AuthPayloadType) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
