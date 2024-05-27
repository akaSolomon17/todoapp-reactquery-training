import { useContext, useEffect, useState } from 'react'
import { useGetAllAds } from '../apis/getAllAds.api';
import { Ad } from '../types/ad.type';
import { AppContextType } from '../types/context.type';
import { AppContext } from "../Context/AppProvider"

const AdsPopup = () => {
    const { setTodoCount, isPopup, setIsPopup } = useContext<AppContextType>(AppContext)

    const { allAds } = useGetAllAds(isPopup);

    const [randomAd, setRandomAd] = useState<Pick<Ad, 'title' | 'content'> | null>(null);

    useEffect(() => {
        if (allAds) {
            const allAdsData = allAds?.data || []
            // Lấy một quảng cáo ngẫu nhiên từ mảng data
            const randomIndex = Math.floor(Math.random() * allAdsData.length);
            setRandomAd(allAdsData[randomIndex]);
        }
    }, [allAds]);

    const handleCloseAds = () => {
        setIsPopup(false)
        setTodoCount(0);
    }

    return (
        <div className={isPopup == false || !randomAd ? ("hidden fixed top-0 left-0 w-full h-full justify-center items-center z-50 bg-black bg-opacity-70") : ("flex fixed top-0 left-0 w-full h-full justify-center items-center z-50 bg-black bg-opacity-70")}>
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