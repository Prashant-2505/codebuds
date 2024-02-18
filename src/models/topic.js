import mongoose from 'mongoose';

let TopicModel;

// Check if the model is already defined
try {
    // Use the existing model if it's already defined
    TopicModel = mongoose.model("TopicModel");
} catch (error) {
    // Define the model if it hasn't been defined
    const topicSchema = new mongoose.Schema({
        topic: {
            type: String,
            required: true,
            unique: true,
        },
    }, { timestamps: true });

    TopicModel = mongoose.model("TopicModel", topicSchema);
}

export default TopicModel;
