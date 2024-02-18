import mongoose from 'mongoose';

let PatternModel;

// Check if the model is already defined
try {
    // Use the existing model if it's already defined
    PatternModel = mongoose.model("PatternModel");
} catch (error) {
    // Define the model if it hasn't been defined
    const patternSchema = new mongoose.Schema({
        pattern: {
            type: String,
            required: true,
            unique: true,
        },
        topic:{
            type : mongoose.Schema.Types.ObjectId,
            ref:"TopicModel",
            required: true
        }
    }, { timestamps: true });

    PatternModel = mongoose.model("PatternModel", patternSchema);
}

export default PatternModel;
