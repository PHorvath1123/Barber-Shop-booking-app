import HomeStyle  from '../styles/home/Home.module.css'
import ServiceBackground from '/barber_shop_scene.png'

export default function Services(){
    
    return(
        <div className={HomeStyle.serviceContainer}>
            <div className='flex justify-end w-[100vw]'>
                <img src={ServiceBackground} alt="Service title background" className={HomeStyle.bg}/>
            </div>
            <section id='Services' className={HomeStyle.serviceTitle}>Barber Services</section>
            <div className={HomeStyle.serviceOptionsContainer}>
                <div className={HomeStyle.serviceCard}>
                    <div className={HomeStyle.serviceNumber}>1</div>
                    <div className={HomeStyle.serviceName}>Classic Haircut</div>
                    <p className=''>Experience a precision haircut tailored to your style. Our barbers use the latest techniques to ensure you leave looking sharp and feeling great.</p>
                </div>
                <div className={HomeStyle.serviceCard}>
                    <div className={HomeStyle.serviceNumber}>2</div>
                    <div className={HomeStyle.serviceName}>Beard Trim</div>
                    <p>Keep your beard looking its best with our expert trimming and shaping services. We use high-quality tools and products for a clean, stylish finish.</p>
                </div>
                <div className={HomeStyle.serviceCard}>
                    <div className={HomeStyle.serviceNumber}>3</div>
                    <div className={HomeStyle.serviceName}>Hot Towel Shave</div>
                    <p>Enjoy a relaxing hot towel shave that leaves your skin smooth and refreshed. Our barbers provide a classic shaving experience with modern comforts.</p>
                </div>
                <div className={HomeStyle.serviceCard}>
                    <div className={HomeStyle.serviceNumber}>4</div>
                    <div className={HomeStyle.serviceName}>Kids' Haircut</div>
                    <p>Our barbers are great with kids, providing fun and stylish haircuts in a comfortable environment. Perfect for children of all ages.</p>
                </div>
                
            </div>
        </div>
        
    );
};