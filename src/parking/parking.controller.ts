import { Controller, Post, Get, Patch, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { InitializeLotDto } from './dto/initialize-lot.dto';
import { ExpandLotDto } from './dto/expand-lot.dto';
import { ParkCarDto } from './dto/park-car.dto';

@Controller()
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post('parking_lot')
  initializeLot(@Body() dto: InitializeLotDto) {
    const totalSlots = this.parkingService.initializeLot(dto.no_of_slot);
    return {
      no_of_slot: dto.no_of_slot,
      total_slot: totalSlots
    };
  }

  @Patch('parking_lot')
  expandLot(@Body() dto: ExpandLotDto) {
    const totalSlots = this.parkingService.expandLot(dto.increment_slot);
    return {
      increment_slot: dto.increment_slot,
      total_slot: totalSlots
    };
  }

  @Post('park')
  parkCar(@Body() dto: ParkCarDto) {
    const allocatedSlot = this.parkingService.parkCar(dto);
    return {
      car_reg_no: dto.car_reg_no,
      car_color: dto.car_color,
      allocated_slot_number: allocatedSlot
    };
  }

  @Get('registration_numbers/:color')
  getRegistrationNumbers(@Param('color') color: string) {
    return this.parkingService.getRegistrationNumbersByColor(color);
  }

  @Get('slot_numbers/:color')
  getSlotNumbers(@Param('color') color: string) {
    return this.parkingService.getSlotNumbersByColor(color);
  }

  @Post('clear')
  clearSlot(@Body() body: { slot_number: number }) {
    const freedSlot = this.parkingService.clearSlot(body.slot_number);
    return {
      slot_number: body.slot_number,
      freed_slot_number: freedSlot
    };
  }

  @Get('status')
  getStatus() {
    return this.parkingService.getOccupiedSlots();
  }
}