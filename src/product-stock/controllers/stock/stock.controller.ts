import {
  Controller,
  Delete,
  InternalServerErrorException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/guard/jwtAuth/jwt-auth.guard';
import { GetStockDto } from '../../../dto/getStock.dto';
import { StockService } from '../../services/stock/stock.service';

@Controller('stock')
export class StockController {
  constructor(private stockService: StockService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createStock(@Req() req: any): Promise<GetStockDto> {
    try {
      return await this.stockService.createStock({
        createdBy: req.user.userId,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Sorry something went wrong on our end 😒',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteStock(@Param() params): Promise<any> {
    try {
      const { id } = params;
      await this.stockService.deleteStock(id);
      return { message: `Stock with stock ID ${id} has been deleted` };
    } catch (error) {
      throw new InternalServerErrorException(
        'Sorry something went wrong on our end 😒',
      );
    }
  }
}
