import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { List } from '../../list/entities/list.entity';
import { BaseEntity } from '../../base.entity';

@Entity('item')
export class Item extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @ManyToOne(() => List, (list) => list.items, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'listId' })
  list: List;

  @Column()
  listId: number;

  @Column({ type: 'text', nullable: true })
  note?: string;

  @Column({ type: 'boolean', default: false })
  isCompleted?: boolean;
}
