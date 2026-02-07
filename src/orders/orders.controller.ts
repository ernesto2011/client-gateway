import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query, Patch } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { OrderPaginationDto, StatusDto } from './dto';
import { PaginationDto } from 'src/common';
import { firstValueFrom } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send('createOrder' , createOrderDto);
  }

  @Get()
  async findAll(@Query() paginationDto: OrderPaginationDto) {
    try {
      const orders = await firstValueFrom(
        this.client.send('findAllOrders', paginationDto)
      ) 
      return orders
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {  
    return this.client.send('findOneOrder', id);
  }
  @Get(':status')
  findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto
  ) {  
    return this.client.send('findAllOrders', {
      status: statusDto.status,
      ...paginationDto
    });
  }
  @Patch(":id")
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto
  ) {
    try {
      return this.client.send('changeOrderStatus', {id,status: statusDto.status});
    } catch (error) {
      throw new RpcException(error)
    }
  }
}
