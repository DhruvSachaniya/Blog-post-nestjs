import { AuthGuard } from "@nestjs/passport";

export class PostGuard extends AuthGuard("jwt") {
    constructor () {
        super()
    }
}