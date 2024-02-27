import mongoose from 'mongoose';

let CompanyModel;

try {
    CompanyModel = mongoose.model("CompanyModel");
} catch (error) {
    const companySchema = new mongoose.Schema({
        name: {
            type:String
        },
        interview_experience: {
            type: String,
            required: true,
        },
        questions: {
            type: String,
            required: true,
        },
        like:{
            type:Number,
            default:0
        }
    }, { timestamps: true });

    CompanyModel = mongoose.model("CompanyModel", companySchema);
}

export default CompanyModel;
