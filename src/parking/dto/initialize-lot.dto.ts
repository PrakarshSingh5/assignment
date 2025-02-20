import { IsNumber, Min } from 'class-validator';

export class InitializeLotDto {
  @IsNumber()
  @Min(1)
  no_of_slot: number;
}