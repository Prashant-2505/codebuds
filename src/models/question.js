import mongoose from 'mongoose';

let QuestionModel;

try {
    QuestionModel = mongoose.model("QuestionModel");
} catch (error) {
    const questionSchema = new mongoose.Schema({
        topic: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TopicModel",
            required: true
        },
        pattern: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PatternModel",
            required: true
        },
        questionName: {
            type: String,
            required: true,
            unique: true,
        },
        questionDescription: {
            type: String,
            required: true,
        },
        questionLink: {
            type: String,
            required: true,
        }
    }, { timestamps: true });

    QuestionModel = mongoose.model("QuestionModel", questionSchema);
}

export default QuestionModel;
