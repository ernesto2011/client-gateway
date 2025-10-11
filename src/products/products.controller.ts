import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}
  @Post()
  createProduct() {
    return 'Action for create product';
  }
  @Get()
  finAllProducts() {
    return 'Action for return all products';
  }
  @Get(':id')
  finOneProduct(@Param('id') id: string) {
    return `Action for return one product with id: ${id}`;
  }
  @Delete(':id')
  deleteOneProduct(@Param('id') id: string) {
    return `Action for delete one product with id: ${id}`;
  }
  @Patch(':id')
  updateOneProduct(@Param('id') id: string) {
    return `Action for update one product with id: ${id}`;
  }
}
