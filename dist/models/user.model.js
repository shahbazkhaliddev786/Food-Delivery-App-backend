import { model, Schema } from "mongoose";
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifyToken: { type: String },
}, { timestamps: true });
export const User = model("User", userSchema);
//# sourceMappingURL=user.model.js.map