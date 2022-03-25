export interface IFeed {
    title: string,
    description: string,
    addedBy: string,
    category:string,
    tag?: string[],
    thumbnailImage?: string,
    monetization:any[],
    curriculum:any[],
    type:string,
    video?: string,
    image?: string[],
    status?: boolean
}