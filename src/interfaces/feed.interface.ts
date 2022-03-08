export interface IFeed {
    title: string,
    description: string,
    addedBy: string,
    category:string,
    tag?: string[],
    thumbnailImage?: string,
    monetization:any[],
    video?: string,
    image?: string[],
    status?: boolean
}