import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { postblogservice } from "./post-blog.service";
import { Request } from "express";
import { AuthGuard } from "@nestjs/passport";
import { PostGuard } from "./guard";
import { Postdto } from "./post-dto";

@Controller("blog")
export class postblogcontroller {
    constructor (private blogpostservice: postblogservice) {}

    @UseGuards(AuthGuard("jwt"))
    @Post("post")
    postblog (@Body() dto: Postdto, @Req() req: Request) {
        return this.blogpostservice.postblog(dto, req);
    }

    @UseGuards(PostGuard)
    @Get("all")
    getallpost(@Req() req: Request) {
        return this.blogpostservice.getallpost(req);
    }

    @UseGuards(PostGuard)
    @Get("yourpost")
    getyourpost(@Req() req: Request) {
        return this.blogpostservice.getyourpost(req);
    }
}