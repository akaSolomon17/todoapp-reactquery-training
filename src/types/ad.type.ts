export interface Ad {
    "id": number,
    "title": string,
    "content": string,
    "direct-ads": string
}

export type Ads = Pick<Ad, 'id'|'title'|'content'>[]