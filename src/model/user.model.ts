import { timeStamp } from "console";
import mongoose, {Schema, Document} from "mongoose"; // we nee Document cuz we're introducing type safety as we're using Typescript


export interface MessageProps extends Document{ // cuz this will ultimately get stored in mongoose Document only
    content: string,
    createdAt: Date
}

export interface UserProps extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isExceptingReviews: boolean;
    messages: MessageProps[]

}

const MessageSchema: Schema<MessageProps> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
}, {timestamps: true})

const UserSchema: Schema<UserProps> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, "Please use a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    verifyCode: {
        type: String,
        required: [true, "Verify code is required"]
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify code expiry is required"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isExceptingReviews: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]
    
}, {timestamps: true})

const UserModel = (mongoose.models.User as mongoose.Model<UserProps>) || (mongoose.model<UserProps>("User", UserSchema))

export default UserModel