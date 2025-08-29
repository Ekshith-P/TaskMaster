import mongoose, { Schema, Document } from 'mongoose';

interface IInventoryUnit extends Document {
  scope: 'eventSeat' | 'roomNight';
  key: {
    eventId?: mongoose.Types.ObjectId;
    seatId?: string; // e.g., "A1", "B12"
    listingId?: mongoose.Types.ObjectId;
    date?: string; // e.g., "2025-12-25"
  };
  status: 'FREE' | 'HOLD' | 'BOOKED';
  version: number; // For optimistic concurrency
}

const InventoryUnitSchema: Schema = new Schema({
  scope: { type: String, required: true, enum: ['eventSeat', 'roomNight'] },
  key: { type: Object, required: true },
  status: { type: String, required: true, default: 'FREE', index: true },
}, { versionKey: 'version' }); // Mongoose's built-in versioning!

// **CRITICAL** This unique index prevents double-creation of the same seat/room night.
InventoryUnitSchema.index({ scope: 1, 'key.eventId': 1, 'key.seatId': 1 }, { unique: true, sparse: true });
InventoryUnitSchema.index({ scope: 1, 'key.listingId': 1, 'key.date': 1 }, { unique: true, sparse: true });

export default mongoose.model<IInventoryUnit>('InventoryUnit', InventoryUnitSchema);