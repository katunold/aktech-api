import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException, NotFoundException,
  Post,
  Put,
  Req,
  UseGuards
} from "@nestjs/common";
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
  @Put('update/:id')
  async updateSupplier(
    @Req() req: any,
    @Body() updatedSupplier: any,
  ): Promise<any> {
    const { user, params } = req;
    updatedSupplier['updatedBy'] = user.userId;
    try {
      const updatedSupplierData = await this.supplierService.updateSupplier(
        params.id,
        updatedSupplier,
      );
      if (updatedSupplierData.raw.length) {
        return updatedSupplierData.raw[0];
      }
      throw 'Supplier not found';
    } catch (error) {
      if (error === 'Supplier not found') {
        throw new NotFoundException(`Supplier with id ${params.id} not found`);
      } else if (error.code == 23505) {
        throw new BadRequestException(
          `Supplier with the name ${updatedSupplier.supplierName} already exists, please use a unique supplier name`,
        );
      } else {
        throw new InternalServerErrorException(
          'Sorry something went wrong on our end 😒',
        );
      }
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
