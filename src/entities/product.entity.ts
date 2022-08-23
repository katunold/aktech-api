import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  productName: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @Column({ nullable: false })
  createdBy: number;

  @Column({ default: 0, nullable: false })
  pricePerUnit: number;

  @Column({ default: 0, nullable: false })
  availableStoke: number;

  @Column({ type: 'text' })
  notes: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}
