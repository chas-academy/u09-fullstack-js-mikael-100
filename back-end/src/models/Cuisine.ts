import mongoose, { Document, Schema } from "mongoose";

export interface ICuisine extends Document {
  hospital: string;
  dish: string;
  information: string;
  allergies: string[];
  image: string;
  price: number;
  options: string;
  quantity: number;
  createdAt?: Date;
}

// Detta är Mongoose Scheme

const CuisineSchema: Schema<ICuisine> = new Schema({
  hospital: { type: String, required: true },
  dish: { type: String, required: true },
  information: { type: String, required: true },
  allergies: { type: [String], required: true },
  image: { type: String, default: "" },
  price: { type: Number, required: true },
  options: { type: String, required: true },
  quantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Här är den skapade modellen som sedan exporteras och tas in av controllern

const Cuisine = mongoose.model<ICuisine>("Cuisine", CuisineSchema);

export default Cuisine;
