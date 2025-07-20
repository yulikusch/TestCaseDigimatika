import { Controller, Get,
  Post,
  Put,
  Delete,
  Param,
  Body, } from '@nestjs/common';

  import { TransaksiService } from './transaksi.service';
import { Transaksi } from './transaksi.entity';

@Controller('transaksi')
export class TransaksiController {
constructor(private readonly service: TransaksiService) {}

 @Get()
  findAll(): Promise<Transaksi[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Transaksi> {
    return this.service.findOne(id);
  } 

  @Post()
  create(@Body() data: Partial<Transaksi>): Promise<Transaksi> {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Transaksi>): Promise<Transaksi> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.service.remove(id);
  }


}
