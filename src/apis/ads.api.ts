import { Ads } from '../types/ad.type'
import http from '../utils/http'

export const getAds = (page:number | string, limit: number | string) => {
  http.get<Ads>('todoList',{
    params:{
        _page: page,
        _limit: limit
    }
  })
}
