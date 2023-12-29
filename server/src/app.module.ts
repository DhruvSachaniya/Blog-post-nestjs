import { Module } from '@nestjs/common';
import { authmodule } from './auth/auth.module';
import { postblogmodule } from './post-blog/post-blog.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  })
    ,authmodule, postblogmodule],
})
export class AppModule {}
