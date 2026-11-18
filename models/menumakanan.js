import mongoose from "mongoose";

const menuMakananSchema = new mongoose.Schema(
  
  {
    timestamps: true,
    versionKey: false,
  },
);

menuMakananSchema.index({ name: 1 });
menuMakananSchema.index({ description: 1 });
menuMakananSchema.index({ price: 1 });
menuMakananSchema.index({ is_available: 1 });

const MenuMakanan = mongoose.model(
  "MenuMakanan",
  menuMakananSchema,
  "menu_makanan",
);

export default MenuMakanan;
