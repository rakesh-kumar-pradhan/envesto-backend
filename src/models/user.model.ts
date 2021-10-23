import { model, Schema } from "mongoose";

const UserSchema: Schema = new Schema({
    name: {type: String, required: true, trim: true, lowercase: true},
    email: {type: String, required: true, trim: true, lowercase: true, unique: true},
    phone: {type: Number, required: true, trim: true, unique: true},
    dob: {type: String, required: true, trim: true},
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