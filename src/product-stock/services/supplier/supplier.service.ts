import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierEntity } from '../../../entities/supplier.entity';
import { Repository } from 'typeorm';
import { SupplierDto } from '../../../dto/supplier.dto';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(SupplierEntity)
    private supplierRepository: Repository<SupplierEntity>,
  ) {}

  async createSupplier(supplierData: SupplierDto): Promise<SupplierDto> {
    return await this.supplierRepository.save(supplierData).catch((error) => {
      throw error;
    });
  }
}
