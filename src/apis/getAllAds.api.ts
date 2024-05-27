import { useQuery } from '@tanstack/react-query';
import { Ads } from '../types/ad.type'
import http from '../utils/http'

export const getAllAds = () => http.get<Ads>('ads')

// GET all Ads
export const useGetAllAds = ()=>{
    const { data: allAds, ...options } = useQuery({
        queryKey: ["ads"],
        queryFn: () => getAllAds()
    });
    return {allAds, ...options}
}