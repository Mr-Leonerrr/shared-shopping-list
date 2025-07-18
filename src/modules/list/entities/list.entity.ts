import { Entity, Column, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base.entity';
import { User } from '../../users/entities/user.entity';
import { Group } from '../../group/entities/group.entity';
import { Item } from '../../items/entities/item.entity';
import { Exclude } from 'class-transformer';

@Entity('list')
export class List extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToOne(() => User, (user) => user.lists, { nullable: false })
  @JoinColumn({ name: 'ownerId' })
  @Exclude()
  owner: User;

  @Column({ nullable: false })
  ownerId: number;

  @OneToMany(() => Item, (item) => item.list)
  items: Item[];

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToOne(() => Group, (group) => group.lists, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'groupId' })
  group: Group;

  @Column({ type: 'int', nullable: true })
  groupId?: number;
}
