export interface Ad {
    "id": number,
    "title": string,
    "image": string,
    "direct-ads": string
}

export type Ads = Pick<Ad, 'id'|'title'|'image'>[]