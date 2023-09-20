import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierEntity } from '../../../entities/supplier.entity';
import { Repository } from 'typeorm';
import { SupplierDto } from '../../../dto/supplier.dto';

@Injectable()
export class SupplierService {
  private readonly logger = new Logger(SupplierService.name);
  constructor(
    @InjectRepository(SupplierEntity)
    private supplierRepository: Repository<SupplierEntity>,
  ) {}

  async createSupplier(supplierData: SupplierDto): Promise<SupplierDto> {
    this.logger.log(`Adding supplier ...`);
    return await this.supplierRepository.save(supplierData).catch((error) => {
      throw error;
    });
  }

  async updateSupplier(
    supplierId: number,
    updatedSupplierData: any,
  ): Promise<any> {
    this.logger.log(`Updating supplier ${supplierId} ...`);
    return await this.supplierRepository
      .createQueryBuilder()
      .update(updatedSupplierData)
      .where({
        id: supplierId,
      })
      .returning('*')
      .execute()
      .catch((error) => {
        throw error;
      });
  }

  async getSupplierList(): Promise<SupplierEntity[]> {
    this.logger.log(`Fetching supplier list ...`);
    return await this.supplierRepository
      .find({
        select: ['id', 'supplierName', 'email', 'phone'],
      })
      .catch((error) => {
        throw error;
      });
  }

  async deleteSupplier(id: number): Promise<void> {
    this.logger.log(`Deleting supplier ${id} ...`);
    await this.supplierRepository.softDelete({ id });
  }
}
