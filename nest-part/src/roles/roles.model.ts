import { Column, DataType, HasMany, Model,Table } from "sequelize-typescript";
import { User } from "src/users/user.model";

interface RoleCreationAttr {
    value: string;
    description: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttr> {
    @Column({type:DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type:DataType.STRING, unique: true, allowNull: false})
    value: string;

    @Column({type:DataType.STRING, allowNull: false})    
    description: string;

    @HasMany(() => User)
    users: User[];
}