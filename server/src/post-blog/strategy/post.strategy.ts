import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { prismaservice } from "src/prisma/prisma.service"

@Injectable()
export class poststrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(private config: ConfigService, private prisma: prismaservice) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('SECRET_KEY'),
        })
    }

    async validate(payload: { userId: number, email: string }) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.userId
            }
        })
        return  user;
    }
}