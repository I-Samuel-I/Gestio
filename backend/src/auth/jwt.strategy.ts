import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserRole } from 'src/users/enums/user-role.enum';

interface JwtPayload {
    sub: string;
    email: string;
    role: string;
    company: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
        });
    }

    async validate(payload: JwtPayload) {
        const normalizedRole = payload.role === 'admin' ? UserRole.MANAGER : (payload.role as UserRole);

        return {
            id: payload.sub,
            email: payload.email,
            company: payload.company,
            role: normalizedRole,
        };
    }
}
