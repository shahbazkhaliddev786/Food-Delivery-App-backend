import { model, Schema } from "mongoose";
const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    menu: [{
            type: Schema.Types.ObjectId,
            ref: "Menu",
        }],
    image: {
        type: String
    },
    rating: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
export const Restaurant = model("Restaurant", restaurantSchema);
//# sourceMappingURL=restaurant.model.js.map