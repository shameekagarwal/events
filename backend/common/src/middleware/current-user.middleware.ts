import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { AuthPayloadType } from '../types/auth-payload.type';

declare module 'express' {
  export interface Request {
    currentUser: {
      id: number;
      email: string;
    } | null;
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
      try {
        const token = req.headers.authorization.split('Bearer ')[1];
        const payload = this.jwtService.verify(token) as AuthPayloadType;
        req.currentUser = {
          id: payload.id,
          email: payload.email,
        };
      } catch (e) {}
    }
    next();
  }
}
