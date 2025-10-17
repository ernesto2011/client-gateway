import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus, OrderStatuslist } from "../enum/order-enum";

export class StatusDto {
    @IsOptional()
    @IsEnum(OrderStatuslist,{
        message: `Status must be one of the following values: ${OrderStatuslist.join(', ')}`
    })
    status: OrderStatus
}