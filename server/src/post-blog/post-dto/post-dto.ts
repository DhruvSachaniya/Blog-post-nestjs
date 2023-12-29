import { IsNotEmpty, IsString } from "class-validator"

export class Postdto {

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    content: string

}

export class Postuserdto {
    @IsNotEmpty()
    id: number
    @IsString()
    name: string
}