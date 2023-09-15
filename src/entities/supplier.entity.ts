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
export class SupplierEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  supplierName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

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
