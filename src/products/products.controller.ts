import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SEVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SEVICE) private readonly clientProductService: ClientProxy
  ) {}
  @Post()
  createProduct(@Body() createProductDtp: CreateProductDto) {
    return this.clientProductService.send({cmd: 'create_product'}, createProductDtp);
  }
  @Get()
  finAllProducts(@Query() paginationDto: PaginationDto) {
    return this.clientProductService.send({cmd: 'find_all_products'}, paginationDto);
  }
  @Get(':id')
  async finOneProduct(@Param('id') id: string) {
    return this.clientProductService.send({cmd: 'find_one_product'}, {id})
      .pipe(
        catchError(err => {
          throw new RpcException(err)
        })
      )
    // try {
    //   const product = await firstValueFrom(
    //   this.clientProductService.send({cmd: 'find_one_product'}, {id}));
    //   return product;
    // } catch (error) {
    //   throw new RpcException(error);
    // }
  }
  @Delete(':id')
  deleteOneProduct(@Param('id') id: string) {
    return this.clientProductService.send({ cmd: 'remove_product' }, {id})
    .pipe(
      catchError(err => {
        throw new RpcException(err)
      })
    )

  }
  @Patch(':id')
  updateOneProduct(@Param('id') id: string, @Body() updateproductDto:UpdateProductDto) {
    return this.clientProductService.send({ cmd: 'update_product' }, {id, ...updateproductDto} )
    .pipe(
      catchError(err => {
        throw new RpcException(err)
      })
    )
  }
}
