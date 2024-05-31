import { useQuery } from '@tanstack/react-query';
import { Ads } from '../types/ad.type'
import http from '../utils/http'

export const getAllAds = () => http.get<Ads>('ads')

//GET all Ads
export const useGetAllAds = (shouldFetchAds: boolean)=>{
    return useQuery({
        queryKey: ["ads"],
        queryFn: () => getAllAds(),
        enabled: shouldFetchAds
    });
}