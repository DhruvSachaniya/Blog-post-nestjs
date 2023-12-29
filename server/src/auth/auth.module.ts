import { Module } from "@nestjs/common";
import { authcontroller } from "./auth.controller";
import { authservice } from "./auth.service";
import { prismaservice } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
    providers: [authservice, prismaservice, JwtService],
    controllers: [authcontroller],
})

export class authmodule {}