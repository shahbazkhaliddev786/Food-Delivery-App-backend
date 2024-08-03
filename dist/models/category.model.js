import { model, Schema } from "mongoose";
const categorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    value: {
        type: String,
        unique: true,
        required: true
    }
}, { timestamps: true });
export const Category = model("Category", categorySchema);
//# sourceMappingURL=category.model.js.map