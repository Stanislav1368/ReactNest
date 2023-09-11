import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

    async createRole(dto: CreateRoleDto) {
        const role = await this.roleRepository.create(dto);
        return role;
    }
    
    async getAllRoles() {
        const roles = await this.roleRepository.findAll();
        return roles;
    }

    async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOne({where: {value}});
        if (!role) {
            throw new NotFoundException("Role not found");
        }
        return role;
    }
    async getRoleIdByValue(value: string) {
        const role = await this.roleRepository.findOne({where: {value}});
        if (!role) {
            throw new NotFoundException("Role not found");
        }
        return role.id;
    }
}