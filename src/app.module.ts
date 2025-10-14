import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PRODUCT_SEVICE } from './config';
import { ProductsController } from './products/products.controller';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    ClientsModule.register([
      { 
        name: PRODUCT_SEVICE, 
        transport: Transport.TCP,
        options: { 
          host: envs.productsService.host, 
          port: envs.productsService.port
        }
       },
    ]),
  ],
})
export class AppModule {}
