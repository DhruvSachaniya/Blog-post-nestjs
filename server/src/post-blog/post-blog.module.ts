import { Module } from "@nestjs/common";
import { postblogcontroller } from "./post-blog.controller";
import { postblogservice } from "./post-blog.service";
import { JwtModule } from "@nestjs/jwt";
import { poststrategy } from "./strategy";
import { prismaservice } from "src/prisma/prisma.service";

@Module({
    imports: [JwtModule.register({})],
    providers: [postblogservice, poststrategy, prismaservice],
    controllers: [postblogcontroller]
})

export class postblogmodule {}
