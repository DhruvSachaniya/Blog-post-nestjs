import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class authdto {
    @IsString()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}