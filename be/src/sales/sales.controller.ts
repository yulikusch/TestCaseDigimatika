import { Controller, Get,
  Post,
  Put,
  Delete,
  Param,
  Body, } from '@nestjs/common';

  import { SalesService } from './sales.service';
import { Sales } from './sales.entity';

@Controller('sales')
export class SalesController {
constructor(private readonly service: SalesService) {}

 @Get()
  findAll(): Promise<Sales[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Sales> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Sales>): Promise<Sales> {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Sales>): Promise<Sales> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.service.remove(id);
  }


}
