import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export function CardSkeleton () {
    return (
        <SkeletonTheme baseColor='#c2f0ce'>

            <div className="card mb-4 p-3 rounded-lg bg-white ">
              
                <section className="flex flex-col items-center col-span-1">
                    <img 
                    className="w-11 h-9"
                    src='/arrows/redditlatam-arrow-neutral.svg'/>
                    <div className="w-1/2"><Skeleton style={{display: 'inline-block'}}/></div>
                   
                    <img className="w-11 h-9 transform scale-y-[-1]" 
                    src='/arrows/redditlatam-arrow-neutral.svg'/>
                </section>
                

                <div className="col-start-2"> 
                    <Skeleton width={'70%'} height={'25px'}></Skeleton>
                    <div className="mt-2"> 
                    <Skeleton height={'200px'}></Skeleton>
                    </div>
                    <hr className="my-5"/>

                    <div className="flex justify-between "> 
                    <span className="w-1/12"><Skeleton /> </span>
                    <span className="w-1/5"><Skeleton /> </span>
                        <span className="mr-1" >💬</span>
                    </div>
                </div>


            </div>
        </SkeletonTheme>
    )
}