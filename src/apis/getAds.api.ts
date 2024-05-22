import { Ads } from '../types/ad.type'
import http from '../utils/http'

export const getAds = () => http.get<Ads>('ads')
