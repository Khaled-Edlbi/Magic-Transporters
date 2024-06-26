import mongoose from 'mongoose'


const Schema = mongoose.Schema

const magicItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  
  { timestamps: true }
);

const magicItemModel = mongoose.model('magicItem', magicItemSchema)
export default magicItemModel