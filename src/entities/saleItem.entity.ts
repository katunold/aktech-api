import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SalesEntity } from './sales.entity';

@Entity()
export class SaleItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SalesEntity, (sale) => sale.id)
  sale: number;
}
