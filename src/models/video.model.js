import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; /* a plugin that adds pagination functionality to Mongoose aggregate queries. 
Pagination allows you to fetch records in chunks (pages), which is useful when dealing with large datasets.*/

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, //cloudinary url
            required: true
        },
        thumbnail: {
            type: String, //cloudinary url
            required: true
        },
        title: {
            type: String, 
            required: true
        },
        description: {
            type: String, 
            required: true
        },
        duration: {
            type: Number, 
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }

    }, 
    {
        timestamps: true //  automatically adds two fields to the schema: createdAt and updatedAt. 
                         // These fields record the creation and modification times of each video document, so you don't need to manage them manually.
    }
)

videoSchema.plugin(mongooseAggregatePaginate)   // By adding this plugin, you can easily paginate the results when querying large sets of video documents (for example, when displaying videos on a website).

export const Video = mongoose.model("Video", videoSchema)
