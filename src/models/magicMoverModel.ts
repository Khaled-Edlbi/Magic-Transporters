import mongoose from 'mongoose'


const Schema = mongoose.Schema

const magicMoverSchema = new Schema(
  {
    weightLimit: {
      type: Number,
      required: true,
      min: 1,
    },

    energy: {
      type: Number,
      required: true,
      min: 1,
    },

    questState: {
      type: String,
      enum: ['resting', 'loading', 'on a mission', 'done'],
      default: 'resting',
    },

    items: [
      {
        type: Schema.Types.ObjectId,
        ref: 'MagicItem'
      }
    ],

    numberOfMissions: {
      type: Number,
      default: 0
    },
  },

  { timestamps: true }
);

const magicMoverModel = mongoose.model('magicMover', magicMoverSchema)
export default magicMoverModel