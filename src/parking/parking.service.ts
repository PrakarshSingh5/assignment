import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ParkingLot } from '../models/parking-lot.model';
import { Car } from '../models/car.model';
import { ParkCarDto } from './dto/park-car.dto';

@Injectable()
export class ParkingService {
  private parkingLot: ParkingLot;

  initializeLot(size: number): number {
    this.parkingLot = new ParkingLot(size);
    return this.parkingLot.getTotalSlots();
  }

  expandLot(additionalSlots: number): number {
    if (!this.parkingLot) {
      throw new HttpException('Parking lot not initialized', HttpStatus.BAD_REQUEST);
    }
    return this.parkingLot.expandLot(additionalSlots);
  }

  parkCar(carData: ParkCarDto): number {
    if (!this.parkingLot) {
      throw new HttpException('Parking lot not initialized', HttpStatus.BAD_REQUEST);
    }
    try {
      const car = new Car(carData.car_reg_no, carData.car_color);
      return this.parkingLot.parkCar(car);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  clearSlot(slotNumber: number): number {
    if (!this.parkingLot) {
      throw new HttpException('Parking lot not initialized', HttpStatus.BAD_REQUEST);
    }
    try {
      return this.parkingLot.clearSlot(slotNumber);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  getOccupiedSlots() {
    if (!this.parkingLot) {
      throw new HttpException('Parking lot not initialized', HttpStatus.BAD_REQUEST);
    }
    return this.parkingLot.getOccupiedSlots();
  }

  getRegistrationNumbersByColor(color: string): string[] {
    if (!this.parkingLot) {
      throw new HttpException('Parking lot not initialized', HttpStatus.BAD_REQUEST);
    }
    return this.parkingLot.getRegistrationNumbersByColor(color);
  }

  getSlotNumbersByColor(color: string): string[] {
    if (!this.parkingLot) {
      throw new HttpException('Parking lot not initialized', HttpStatus.BAD_REQUEST);
    }
    return this.parkingLot.getSlotNumbersByColor(color);
  }
}