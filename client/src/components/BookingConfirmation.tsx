import summaryLogo from '/summary_logo.png'
import Scissor from '/summary_scissor.png'
import AppointmentStyle  from '../styles/appointment/Appointment.module.css'
import Button from './ui/Button'
import Alfredo from '/barbers/alfredo_torres.png'


export default function BookingConfirmation(){

    return(
        <section className={AppointmentStyle.summaryCt}>
            <img src={Scissor} alt="Scissor"/>
            <h2 className={AppointmentStyle.title}>Booking summary</h2>
            <article className={AppointmentStyle.selectedOptionsCt}>
                <div className={AppointmentStyle.barberSummaryCt} >
                    <img className={AppointmentStyle.choosedBarberImg} src={Alfredo} alt=""/>
                    <p className='relative top-[-60px] font-title text-md'>Alfredo Torres</p>
                </div>
                <div className={AppointmentStyle.selectedBookingDetailsCt}>
                    <ul>
                        <li>
                            <p>Date:</p>
                            <span>2024.10.02 16:00</span>
                        </li>
                        <li>
                            <p>Service:</p>
                            <span>Senior Cut 65+</span>
                        </li>
                        <li>
                            <p>Price:</p>
                            <span>25$</span>
                        </li>
                    </ul>
                </div>
            </article>
            <article className={AppointmentStyle.customerDetailsCt}>
                <h3 className='text-md sm:text-lg font-title mb-[3rem]'>Customer Information</h3>
                <div className={AppointmentStyle.customerDetails}>
                    <ul>
                        <li>
                            <p>Name:</p>
                            <span>Kiss Károly</span>
                        </li>
                        <li>
                            <p>E-mail:</p>
                            <span>kiss@gmail.com</span>
                        </li>
                        <li>
                            <p>Phone:</p>
                            <span className='tracking-widest'>0171417785</span>
                        </li>
                        <li>
                            <p>Comment:</p>
                            <span className='text-justify hyphens-auto pl-[2rem] overflow-scroll h-[150px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, error deleniti commodi maiores perferendis recusandae.</span>
                        </li>
                    </ul>
                </div>
            </article>
            <div className={AppointmentStyle.buttonBox}>
                <Button type='reset'>Reset Booking</Button>
                <Button>Confirm booking</Button>
            </div>
            <img className={AppointmentStyle.endLogoInSummary} src={summaryLogo} alt="" />
        </section>
    );
}