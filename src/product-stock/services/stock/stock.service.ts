import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockEntity } from '../../../entities/stock.entity';
import { GetStockDto } from '../../../dto/getStock.dto';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(StockEntity)
    private stockRepository: Repository<StockEntity>,
  ) {}

  async createStock(stockData: { createdBy: number }): Promise<GetStockDto> {
    return await this.stockRepository.save(stockData).catch((error) => {
      throw error;
    });
  }

  async deleteStock(id: number): Promise<void> {
    await this.stockRepository.softDelete({ id });
  }
}
