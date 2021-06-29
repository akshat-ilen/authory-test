import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsPositive,
} from 'class-validator';
import { OrderByEnum } from '../enums/order-by.enum';
import { Type } from 'class-transformer';

export class AnalyticsQueryParamsDto {
  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  from: Date;

  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  to: Date;

  @IsEnum(OrderByEnum, {
    message: `orderBy should be either of ${Object.values(OrderByEnum).filter(
      (k) => typeof k === 'string',
    )}`,
  })
  orderBy: OrderByEnum;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  Id: number;
}
