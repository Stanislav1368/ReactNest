import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';

@Module({
  providers: [PostsService],
  imports: [
    SequelizeModule.forFeature([User])
  ]
})
export class PostsModule {}
