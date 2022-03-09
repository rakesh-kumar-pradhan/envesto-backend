import { model, Schema } from "mongoose";

// email
// password
// username
// Full Name
// channel category
// DOB
// City
// Country
// Expertise
// Interest
// Mobile
// Payment Information
// Followers
// Following
// Social Media handles
// Paid Subscription lists

const UserSchema: Schema = new Schema({
    name: {type: String, required: true, trim: true, lowercase: true},
    email: {type: String, required: true,trim: true, lowercase: true,unique: true},
    password:{type:String,trim: true, lowercase: true},
    country:{type:String,trim: true, lowercase: true},
    interest:{type:String,trim: true, lowercase: true},
    phone: { type: Number, required: true, minLength: 10, maxLength: 10, unique: true },
    dob: {type: String, trim: true},
    isPhoneVerified: {type: Boolean, trim: true, default: false},
    isEmailVerified: {type: Boolean, trim: true, default: false},
    role :{
        type : String,
        enum:["ADMIN", "USER"],
        default:"USER",
    },
}, {timestamps: true});

const Users = model("Users", UserSchema);

export { Users };