import BarbersTitleLogo from '/barbers-title-logo.png';
import HomeStyle  from '../styles/home/Home.module.css';
import { useFetchBarbers } from '../hook/useFetchBarbers';

export default function MeetOurBarbers(){

    const barbers = useFetchBarbers();
    
    return(
        <section id='Barbers' className='flex flex-col items-center mb-[3rem] overflow-x-hidden '>
            <div className='flex flex-col justify-center items-center relative'>
                <img className={HomeStyle.titleLogo} src={BarbersTitleLogo} alt="Meet our barbers title logo"/>
                <div className={HomeStyle.barberTitle}>Meet Our <span className='text-action font-title'>Barbers</span></div>
            </div>
            <p className={HomeStyle.barberText}>Get to know the skilled professionals dedicated to providing you with the finest grooming experience.</p>
            <div className={HomeStyle.BarbersCt}>
            {barbers.map(barber => {
                return(
                    <div key={barber.name} className={HomeStyle.barberInnerCt}>
                        <img src={barber.photo} alt="Barber1" className='w-[26vw] sm:max-w-[18vw] md:max-w-[110px]' />
                        <div className='text-action'>{barber.name}</div>
                        <div id='barberTitle'>{barber.title}</div>
                    </div> 
                );
            })}
            </div>  
        </section>
    );
};