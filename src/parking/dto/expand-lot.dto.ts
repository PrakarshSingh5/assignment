import { IsNumber, Min } from 'class-validator';

export class ExpandLotDto {
  @IsNumber()
  @Min(1)
  increment_slot: number;
}