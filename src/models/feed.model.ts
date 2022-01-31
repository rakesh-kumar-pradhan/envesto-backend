import { model, Schema } from "mongoose";

const FeedSchema: Schema = new Schema({
    title: {type: String, required: true, trim: true},
    addedBy: {type: Schema.Types.ObjectId, ref: 'Users'},
    description: {type: String, required: true, trim: true},
    tag: [{type: String, required: true}],
    thumbnailImage: {type: String},
    image: [{type: String}],
    video: {type: String},
    status: {type: Boolean, default: true},
    isDeleted: {type: Boolean, default: false},
    deletedAt: {type: Date}
}, {timestamps: true});

const Feed = model("Feed", FeedSchema);

export { Feed };