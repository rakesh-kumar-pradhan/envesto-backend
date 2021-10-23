import { Feedback } from "../models/index";
import { Pagination, IRequest } from '../interfaces';

export class FeedbackDal {
    public async postFeedback(data: any) {
        return new Promise(async (resolve, reject) => {
            try {
                const isEmailExist = await Feedback.findOne({email: data.email});
                if(isEmailExist) return resolve({message: "Email already exist", status: false});

                const feedback = new Feedback(data);
                const saveFeedback = await feedback.save();
                return resolve({user: saveFeedback, status: true});
            } catch (error: any) {
                return reject(error);
            }
        })  
    }

    public fetchFeedbackList(data: IRequest) {
        return new Promise(async (resolve, reject) => {
            try {
                const pagination: Pagination = data.params;
                const limit = Math.abs(Number(pagination.perPage)) || process.env.PERPAGE;
                const page = Math.max(0, Number(pagination.page));
                const lists = await Feedback.find().limit(Number(limit)).skip(Number(limit) * page).sort({createdAt: 'desc'});
                return resolve({lists, status: true});
            } catch (error) {
                console.log(error);
                return reject(error);
            }
        })
        
    }
}