import { Entity, Column, OneToMany } from 'typeorm';
import { IsEmail, IsString, Length } from 'class-validator';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../base.entity';
import { List } from '../../list/entities/list.entity';
import { Group } from '../../group/entities/group.entity';

@Entity('user')
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', length: 100 })
  @Exclude()
  password: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsString()
  @Length(2, 50)
  firstName?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsString()
  @Length(2, 50)
  lastName?: string;

  @OneToMany(() => Group, (group) => group.id, { nullable: true })
  groups: number[];

  @OneToMany(() => List, (list) => list.ownerId, { nullable: true })
  @Exclude()
  lists: List[];

  @Column({ type: 'boolean', default: false })
  isActive: boolean;
}
