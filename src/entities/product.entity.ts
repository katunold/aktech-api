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

export enum ProductStatus {
  AVAILABLE = 'available',
  NOTAVAILABLE = 'not-available',
}

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  productName: string;

  @Column({ default: 0, nullable: false })
  pricePerUnit: number;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.NOTAVAILABLE,
  })
  productStatus: ProductStatus;

  @Column({ default: 0, nullable: false })
  availableStoke: number;

  @Column({ type: 'text' })
  notes: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  createdBy: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  updatedBy: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}
