import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Postdto, Postuserdto } from "./post-dto";
import { prismaservice } from "src/prisma/prisma.service";
import { Request } from "express";

interface User {
  id: number;
  email: string;
  name: string;
}

@Injectable()
export class postblogservice {
  constructor(private prisma: prismaservice) { }

  async postblog(dto: Postdto, req: Request) {

    const { id, email, name } = req.user as User;

    const create_post = await this.prisma.post.create({
      data: {
        title: dto.title,
        content: dto.content,
        author: {
          connect: {
            id: id
          }
        },
      },
    })



    if (!create_post) {
      throw new HttpException("failed to post!", HttpStatus.FORBIDDEN)
    }

    return create_post;
  }

  async getallpost (req: Request) {
    const allpost = await this.prisma.post.findMany()

    if(!allpost) {
      throw new HttpException("not found!", HttpStatus.FORBIDDEN);
    }

    return allpost;
  }

  async getyourpost (req: Request) {

    const { id } = req.user as User;

    const yourpost = await this.prisma.post.findMany({
      where: {
        authorId: id
      }
    })

    if(!yourpost) {
      throw new HttpException("user not found!", HttpStatus.FORBIDDEN)
    }

    return yourpost;
  }

  async Deleteyourpost(req: Request) {
    
    const { id } = req.user as User;

    const { post_id } = req.body;

    const post = await this.prisma.post.findFirst({
      where: {
        id: Number(post_id)
      }
    })

    if(!post) {
      throw new HttpException("cant find post!", HttpStatus.FORBIDDEN)
    }
    
    //compare it to author id
    if(post.authorId === id) {
      const deletepost = await this.prisma.post.deleteMany({
        where: {
          id: Number(post_id)
        }
      })

      if(!deletepost) {
        throw new HttpException("cant find", HttpStatus.FORBIDDEN)
      }

      return {
        meassge: "post deleted!",
        deletepost
      };
    } 

    return {
      message : "can't delete!"
    }
  }
}