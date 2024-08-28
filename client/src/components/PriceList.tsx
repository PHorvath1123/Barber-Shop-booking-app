import PricingStyle from '../styles/pricing/Pricing.module.css';

export default function PriceList(){

    return(
        <div>
            <h1 className='text-center text-lg font-title uppercase mb-[4rem]'>Pricing List</h1>
            <div className={PricingStyle.outerCt}>
                
                <div className={PricingStyle.categoryCt}>
                    <h2 className={PricingStyle.categoryTitle}>Beard and Shave</h2>
                    <div className={PricingStyle.priceList}>
                        <div className={PricingStyle.listItem}>
                            <span className='text-sm'>Beard and Line Up</span>
                            <span>25 $</span>
                        </div>
                        <div className={PricingStyle.listItem}>
                            <div className='text-sm'>Beard and Line Up</div>
                            <p>25 $</p>
                        </div>
                        <div className={PricingStyle.listItem}>
                            <span className='text-sm'>Beard and Line Up</span>
                            <span>25 $</span>
                        </div>
                        
                    </div>
                </div>
                

            </div>
            
        </div>
    )
};