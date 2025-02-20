import { Car } from "./car.model";

export class ParkingSlot {
    constructor(
      public slot_no: number,
      public isOccupied: boolean = false,
      public car?: Car
    ) {}
  }