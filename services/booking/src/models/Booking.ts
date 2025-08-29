import mongoose, { Schema, Document } from 'mongoose';

interface IBooking extends Document {
  userId: mongoose.Types.ObjectId;
  units: mongoose.Types.ObjectId[]; // Refs to InventoryUnit._id
  price: number;
  status: 'INIT' | 'PENDING_PAYMENT' | 'CONFIRMED' | 'CANCELLED';
  idempotencyKey: string;
  version: number;
}

const BookingSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  units: [{ type: Schema.Types.ObjectId, ref: 'InventoryUnit' }],
  price: { type: Number, required: true },
  status: { type: String, required: true, default: 'INIT' },
  idempotencyKey: { type: String, unique: true, sparse: true } // unique but allow nulls
}, { timestamps: true, versionKey: 'version' });

export default mongoose.model<IBooking>('Booking', BookingSchema);