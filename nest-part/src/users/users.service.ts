import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import fs from 'fs';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { Post } from 'src/posts/posts.model';
import { Role } from 'src/roles/roles.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User, @InjectModel(Post) private postRepository: typeof Post,
                private roleService: RolesService) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("USER");
        user.roleId = role.id;
        user.role = role;
        user.image = '/image/avatar.jpg'; 
        await user.save();
        
        return user;
    }

    async createPost(userId: number, createPostDto: CreatePostDto) {
        const user = await this.userRepository.findByPk(userId);
        if (!user) {
          throw new Error('User not found');
        }
    
        const post = new Post();
        post.text = createPostDto.text;
        post.userId = user.id;
        await post.save();
    
        return post;
    }
    async deletePost(postId: number) {
        const post = await this.postRepository.findByPk(postId);
        if (!post) {
          throw new Error('User not found');
        }
        await post.destroy();
    }
    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserById(id: string) {
        const user = await this.userRepository.findByPk(id, {include: {all: true}});
        if (!user) {
            throw new NotFoundException("User not found");
        }
        return user;
        
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email},include: {all: true}});
        return user;
        
    }

    async updateUser(id: string, body: any) {
        const user = await this.userRepository.findByPk(id);

        if (!user) {
            
            throw new NotFoundException("User not found");
            
        }
        const roleId = await this.roleService.getRoleIdByValue(body.role);
        user.roleId = roleId;
        await user.save();
        return { user };
    }

    async deleteUser(id: string) {
        const user = await this.userRepository.findByPk(id);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        await user.destroy();
        return { message: 'User deleted successfully' };
    }

    async getAvatarByUserId(id: string) {
        const user = await this.userRepository.findByPk(id);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        await user.destroy();
        return { message: 'User deleted successfully' };
    }
}
