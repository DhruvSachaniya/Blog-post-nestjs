import { Body, Controller, Get, Post } from "@nestjs/common";
import { authservice } from "./auth.service";
import { authdto } from "./dto";


@Controller("auth")
export class authcontroller {
    constructor(private authservice: authservice) {}

    @Post("signup")
    signup (@Body() dto: authdto) {
        return this.authservice.signup(dto);
    }

    @Post("signin")
    signin(@Body() dto: authdto) {
        return this.authservice.signin(dto);
    }
}