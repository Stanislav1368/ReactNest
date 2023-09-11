import { BelongsTo, Column, DataType, ForeignKey, Model,Table } from "sequelize-typescript";
import { User } from "src/users/user.model";

interface PostCreationAttr {
    text: string;
}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttr> {
    @Column({type:DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type:DataType.STRING, allowNull: false})    
    text: string;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: true })
    userId: number;

}