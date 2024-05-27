import { useQuery } from '@tanstack/react-query';
import { Ads } from '../types/ad.type'
import http from '../utils/http'

export const getAllAds = () => http.get<Ads>('ads')

export const useGetAllAds = (shouldFetchAds: boolean)=>{
    const { data: allAds, ...options } = useQuery({
        queryKey: ["ads"],
        queryFn: () => getAllAds(),
        enabled: shouldFetchAds
    });
    return {allAds, ...options}
}