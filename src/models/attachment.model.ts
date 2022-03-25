import { Schema, model } from "mongoose";

const AttachmentSchema: Schema = new Schema(
  {
    filePath: { type: String },
    status: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Attachment = model("Attachment", AttachmentSchema);

export { Attachment };
