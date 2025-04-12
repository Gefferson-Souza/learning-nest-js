import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";

@Module({
    imports:[
        JwtModule.register({
            secret: "XVdWMYu-VsFeX8I1NiIsInR5cCI6Ikpr!0aV__JTlH_jCJ9.eyJzE[Zqal3'&=_G,$w/3aI'4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.-hUI9t0YVJiOiIxIciOiJIUzy_EDrGis_wiCwOlYMjM0NTY3ODkwIiwibmFtZSI6IkpvaGeyJhbGcfshFkg",
        }),
        UserModule,
    ],
    controllers: [AuthController],
    providers: [],
    exports: []
})
export class AuthModule {

}