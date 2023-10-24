import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class SalesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  saleDate: string;

  @Column({ type: 'int' })
  totalAmount: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  cashier: number;
}
