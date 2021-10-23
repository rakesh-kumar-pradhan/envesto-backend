import { model, Schema } from "mongoose";

const FeedbackSchema: Schema = new Schema({
    name: {type: String, required: true, trim: true, lowercase: true},
    email: {type: String, required: true, trim: true, lowercase: true, unique: true},
    phone: {type: Number},
    dob: {type: String},
    isEmailVerified: {type: Boolean, trim: true, default: false},
    isLinkSent: {type: Boolean, trim: true, default: false},
}, {timestamps: true});

const Feedback = model("Feedback", FeedbackSchema);

export { Feedback };