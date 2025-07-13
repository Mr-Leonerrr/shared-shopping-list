import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../base.entity';
import { List } from '../../list/entities/list.entity';

@Entity('group')
export class Group extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'boolean', default: false })
  isPublic: boolean;

  @OneToMany(() => List, (list) => list.group)
  lists: List[];
}
