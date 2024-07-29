import BarbersTitleLogo from '/barbers-title-logo.png';
import HomeStyle  from '../styles/home/Home.module.css';
import Barber1 from '../../public/barbers/alfredo_torres.png'

export default function MeetOurBarbers(){

    return(
        <section id='Barbers' className='flex flex-col items-center mb-[10rem]'>
            <div className='flex flex-col justify-center items-center relative'>
                <img className={HomeStyle.titleLogo} src={BarbersTitleLogo} alt="Meet our barbers title logo"/>
                <div className={HomeStyle.barberTitle}>Meet Our <span className='text-action font-title'>Barbers</span></div>
            </div>
            <p className='text-center w-[80vw] md:w-[65ch] mt-[3rem] italic text-sm'>Get to know the skilled professionals dedicated to providing you with the finest grooming experience.</p>
            
            
            <div className={HomeStyle.BarbersCt}>
 
                <div className={HomeStyle.barberInnerCt}>
                    <img src={Barber1} alt="Barber1" className='w-[26vw] sm:max-w-[18vw] md:max-w-[110px]' />
                    <div className='text-action'>Alfredo Torres</div>
                    <div id='barberTitle'> Senior Barber</div>
                </div>
                <div className={HomeStyle.barberInnerCt}>
                    <img src={Barber1} alt="Barber1" className='w-[26vw] sm:max-w-[18vw] md:max-w-[110px]' />
                    <div className='text-action'>Alfredo Torres</div>
                    <div id='barberTitle'> Senior Barber</div>
                </div>
                <div className={HomeStyle.barberInnerCt}>
                    <img src={Barber1} alt="Barber1" className='w-[26vw] sm:max-w-[18vw] md:max-w-[110px]' />
                    <div className='text-action'>Alfredo Torres</div>
                    <div id='barberTitle'> Senior Barber</div>
                </div>
                <div className={HomeStyle.barberInnerCt}>
                    <img src={Barber1} alt="Barber1" className='w-[26vw] sm:max-w-[18vw] md:max-w-[110px]' />
                    <div className='text-action'>Alfredo Torres</div>
                    <div id='barberTitle'> Senior Barber</div>
                </div>
                <div className={HomeStyle.barberInnerCt}>
                    <img src={Barber1} alt="Barber1" className='w-[26vw] sm:max-w-[18vw] md:max-w-[110px]' />
                    <div className='text-action'>Alfredo Torres</div>
                    <div id='barberTitle'> Senior Barber</div>
                </div>
                <div className={HomeStyle.barberInnerCt}>
                    <img src={Barber1} alt="Barber1" className='w-[26vw] sm:max-w-[18vw] md:max-w-[110px]' />
                    <div className='text-action'>Alfredo Torres</div>
                    <div id='barberTitle'> Senior Barber</div>
                </div>
                
            </div>
            
        </section>
    );
};