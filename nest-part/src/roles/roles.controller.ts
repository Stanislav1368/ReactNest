import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @Post()
    create(@Body() roleDto: CreateRoleDto) {
        return this.rolesService.createRole(roleDto);
    }       

    @Get()
    getAll() {
        return this.rolesService.getAllRoles();
    }

    @Get('/:value')
    getOne(@Param('value') value: string) {
        return this.rolesService.getRoleByValue(value);
    }

    

}
