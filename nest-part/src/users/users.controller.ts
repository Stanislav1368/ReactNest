import { Body, Controller, Delete, Get, Param, Post, Put, Req, Request, UseGuards,  } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleDecorator } from 'src/roles/roles.decorator';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';


@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }       

    @Post(':id')
    async update(@Param('id') id: string, @Body() body: any) {
        // const user = await this.usersService.getUserById(id);
        const updatedUser = await this.usersService.updateUser(id, body);
        return {
            message: 'User updated successfully',
            user: updatedUser,
        };
        
    }

    @Delete('posts/:postId')
    async deletePost(@Param('postId') postId: number) {
      return this.usersService.deletePost(postId);
    }

    @Post(':userId/posts')
    async createPost(@Param('userId') userId: number, @Body() createPostDto: CreatePostDto) {
      return this.usersService.createPost(userId, createPostDto);
    }
    @UseGuards(JwtAuthGuard)
    @Get('/admin_panel')
    getAdminPanel(@Request() req) {
        const user = req.user; 
        if (user.role.value === 'ADMIN') {
            return 'Добро пожаловать, администратор!';
        } else {
            return 'Доступ запрещен!';
        } 
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@Request() req) {
        return this.usersService.getUserById(req.user.id);
    }
    
    
    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.usersService.getUserById(id);
    }


    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(id);
    }

    
}
