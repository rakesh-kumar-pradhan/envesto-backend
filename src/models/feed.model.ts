import { model, Schema } from "mongoose";

const FeedSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    subTitle: { type: String, required: false, trim: true },
    addedBy: { type: Schema.Types.ObjectId, ref: "Users" },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: false },
    subCategory: { type: String, required: false },
    level: { type: String, equired: false },
    language: { type: String, required: false },
    monetizationModeType: { type: String, enum: ["free", "paid", "premium"] },
    type: { type: String, enum: ["content", "course"] },
    monetization: [
      {
        allowAudienceSupport: { type: Boolean, default: false },
        paid: {
          price: { type: String, default: 0 },
          allowReshare: { type: Boolean, default: false },
          premium: [],
        },
        premium: {
          premium: [],
        },
      },
    ],
    curriculum: [
      {
        title: { type: String, required: false },
        description: { type: String, required: false, trim: true },
        video: { type: String },
        thumbnailImage: { type: String },
      },
    ],
    tag: [{ type: String, required: true }],
    thumbnailImage: { type: String },
    image: [{ type: String }],
    video: { type: String },
    audio: { type: String },
    status: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

const Feed = model("Feed", FeedSchema);

export { Feed };
