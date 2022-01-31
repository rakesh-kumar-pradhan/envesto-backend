import { Feed } from "../models/index";
import { Pagination, IRequest, IFeed } from '../interfaces';
import { getUserFromRequest } from "../helpers/request.helper";
import { Request } from "express";

export class FeedDal {
    public async postFeed(data: IFeed, files: any, user: any) {
        return new Promise(async (resolve, reject) => {
            try {
                const image = []
                for(let file of files) {
                    const fieldName = file.fieldname;
                    const fileLocation = file.location;
                    switch (fieldName) {
                        case 'thumbnailImage':
                            data.thumbnailImage = fileLocation;
                            break;
                        case 'image':
                            image.push(fileLocation);
                            break
                        case 'video':
                            data.video = fileLocation
                    }
                }
                data.image = image;
                data.addedBy = user._id;
                const newFeed = new Feed(data);
                const saveFeed = await newFeed.save();
                return resolve({details: saveFeed, status: true});
            } catch (error: any) {
                return reject(error);
            }
        })  
    }

    public fetchFeedList(data: IRequest) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = getUserFromRequest(data as Request);
                const pagination: Pagination = data.params;
                const limit = Math.abs(Number(pagination.perPage)) || process.env.PERPAGE;
                const page = Math.max(0, Number(pagination.page));
                const feedId = data.params.id;
                const condition: {[key:string]: string} = {};
                if(feedId) {
                    condition['_id'] = feedId;
                }
                if(user._id) {
                    condition['addedBy'] = user._id;
                }
                const lists = await Feed.find(condition).sort({createdAt: 'desc'});
                return resolve({lists, status: true});
            } catch (error) {
                console.log(error);
                return reject(error);
            }
        })
        
    }
}