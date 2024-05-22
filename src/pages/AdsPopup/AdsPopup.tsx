import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { getAds } from '../../apis/getAds.api';
import { Ad } from '../../types/ad.type';

interface AdsPopupProps {
    setShowAdsPopup: (showAdsPopup: boolean) => void;
}

const AdsPopup = ({ setShowAdsPopup }: AdsPopupProps) => {
    const [randomAd, setRandomAd] = useState<Pick<Ad, 'title' | 'content'> | null>(null);
    const [isClose, setIsClose] = useState<boolean>(false)
    const { data } = useQuery({
        queryKey: ["ads"],
        queryFn: () => getAds()
    });

    useEffect(() => {
        if (data?.data) {
            // Lấy một quảng cáo ngẫu nhiên từ mảng data
            const randomIndex = Math.floor(Math.random() * data.data.length);
            setRandomAd(data.data[randomIndex]);
        }
    }, [data]);

    const handleCloseAds = () => {
        setIsClose(true)
        setShowAdsPopup(false);
    }

    return (
        <div className={isClose || !randomAd ? ("hidden fixed top-0 left-0 w-full h-full justify-center items-center z-50 bg-black bg-opacity-70") : ("flex fixed top-0 left-0 w-full h-full justify-center items-center z-50 bg-black bg-opacity-70")}>
            <div className="bg-white rounded-lg p-8 max-w-sm w-full">
                {randomAd && (
                    <>
                        <h2 className="text-xl font-bold mb-4">{randomAd.title}</h2>
                        <p className="mb-4">{randomAd.content}</p>
                    </>
                )}
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
                    onClick={() => { handleCloseAds() }}
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default AdsPopup