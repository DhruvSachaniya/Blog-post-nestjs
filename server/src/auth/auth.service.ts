import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { prismaservice } from "src/prisma/prisma.service";
import { authdto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class authservice {
    constructor(private prisma: prismaservice, private jwt: JwtService, private config: ConfigService) {}

    async signup(dto: authdto) {
        const user = await this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
            }
        })

        if(!user) {
            throw new HttpException("faild!", HttpStatus.FORBIDDEN)
        }

        return user;
    }

    async signin(dto: authdto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if(!user) {
            throw new HttpException("not found!", HttpStatus.FORBIDDEN)
        }

        const payload = {
            userId: user.id,
            email: user.email
        }

        const token = await this.jwt.signAsync(payload, {
            secret: this.config.get("SECRET_KEY")
        })

        return {
            access_token: token
        }
    }
}