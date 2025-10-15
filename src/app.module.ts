import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PRODUCT_SEVICE } from './config';
import { ProductsController } from './products/products.controller';
import { OrdersModule } from './orders/orders.module';

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
    OrdersModule,
  ],
})
export class AppModule {}
