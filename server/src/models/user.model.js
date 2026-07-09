import mongoose, { Schema } from "mongoose";


const UserSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        photo: {
            url: {
                type: String,
                required:true,
            },
            publicId: {
                type:String,
            }
        },
        userType: {
            type: String,
            enum:["admin","customer","rider","restaurant"],
            required: true,
            default:"customer",
        },
        password: {
            type: String,
            required: true,
        },
        dob: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", UserSchema);

export default User;