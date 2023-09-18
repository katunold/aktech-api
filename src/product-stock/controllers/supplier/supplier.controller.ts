import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SupplierService } from '../../services/supplier/supplier.service';
import { JwtAuthGuard } from '../../../auth/guard/jwtAuth/jwt-auth.guard';
import { SupplierDto } from '../../../dto/supplier.dto';
import { SupplierEntity } from '../../../entities/supplier.entity';

@Controller('supplier')
export class SupplierController {
  constructor(private supplierService: SupplierService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createSupplier(
    @Req() req: any,
    @Body() supplierDto: SupplierDto,
  ): Promise<any> {
    try {
      return await this.supplierService.createSupplier({
        supplierName: supplierDto.supplierName,
        email: supplierDto.email,
        phone: supplierDto.phone,
        createdBy: req.user.userId,
      });
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Supplier name already exists');
      }
      throw new InternalServerErrorException(
        'Sorry something went wrong on our end 😒',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async listAllSuppliers(): Promise<SupplierEntity[]> {
    try {
      return await this.supplierService.getSupplierList();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Sorry something went wrong on our end 😒',
      );
    }
  }
}
