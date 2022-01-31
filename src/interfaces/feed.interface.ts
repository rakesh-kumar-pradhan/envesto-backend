export interface IFeed {
    title: string,
    description: string,
    addedBy: string,
    tag?: string[],
    thumbnailImage?: string,
    video?: string,
    image?: string[],
    status?: boolean
}