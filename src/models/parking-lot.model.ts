import { ParkingSlot } from "./parking-slot.model";
import { Car } from "./car.model";

export class ParkingLot {
    private slots: ParkingSlot[] = [];
  
    constructor(initialSize: number) {
      this.initializeSlots(initialSize);
    }
  
    private initializeSlots(size: number): void {
      const startIndex = this.slots.length;
      for (let i = 0; i < size; i++) {
        this.slots.push(new ParkingSlot(startIndex + i + 1));
      }
    }
  
    public getTotalSlots(): number {
      return this.slots.length;
    }
  
    public expandLot(additionalSlots: number): number {
      this.initializeSlots(additionalSlots);
      return this.getTotalSlots();
    }
  
    public parkCar(car: Car): number {
      const availableSlot = this.slots.find(slot => !slot.isOccupied);
      if (!availableSlot) {
        throw new Error('Parking lot is full');
      }
  
      availableSlot.isOccupied = true;
      availableSlot.car = car;
      return availableSlot.slot_no;
    }
  
    public clearSlot(slotNumber: number): number {
      const slot = this.slots.find(s => s.slot_no === slotNumber);
      if (!slot) {
        throw new Error('Invalid slot number');
      }
      if (!slot.isOccupied) {
        throw new Error('Slot is already empty');
      }
  
      slot.isOccupied = false;
      slot.car = undefined;
      return slot.slot_no;
    }
  
    public getOccupiedSlots(): any[] {
      return this.slots
        .filter(slot => slot.isOccupied && slot.car)
        .map(slot => ({
          slot_no: slot.slot_no,
          registration_no: slot.car!.registration_no,
          color: slot.car!.color
        }));
    }
  
    public getRegistrationNumbersByColor(color: string): string[] {
      return this.slots
        .filter(slot => slot.car?.color.toLowerCase() === color.toLowerCase())
        .map(slot => slot.car!.registration_no);
    }
  
    public getSlotNumbersByColor(color: string): string[] {
      return this.slots
        .filter(slot => slot.car?.color.toLowerCase() === color.toLowerCase())
        .map(slot => slot.slot_no.toString());
    }
  }