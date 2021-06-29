import { Type } from 'class-transformer';

export class AnalyticsResponseDto {
  @Type(() => Number)
  Id: number;

  @Type(() => Number)
  twitter: number;

  @Type(() => Number)
  facebook: number;

  @Type(() => Number)
  pinterest: number;

  @Type(() => Number)
  linkedin: number;

  @Type(() => Number)
  all: number;
}
