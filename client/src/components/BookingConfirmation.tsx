import summaryLogo from '/summary_logo.png'
import Scissor from '/summary_scissor.png'
import AppointmentStyle  from '../styles/appointment/Appointment.module.css'
import Button from './ui/Button'
import type {selectedBarberType} from '../pages/Booking'
import type {selectedDateType} from '../pages/Booking'
import type {serviceType} from '../hook/useServiceContext'
import type {formData} from '../components/BookingDetailsForm'
import {usePostBooking} from '../hook/usePostBooking'

type confirmationProps = {
    barber: selectedBarberType | null,
    date: selectedDateType | null,
    service: serviceType | null,
    appointment: string,
    formData: formData | null
};

export type bookingDataType = {
    barberId?: string,
    date?: string,
    dayName?: string,
    appointment: string,
    serviceTitle?: string,
    servicePrice?: number,
    name?: string,
    email?: string,
    phone?: string,
    comment?: string | null
}

export default function BookingConfirmation(props: confirmationProps){

    const bookingData = {
        barberId: props.barber?.id,
        date: props.date?.date,
        dayName: props.date?.dayName,
        appointment: props.appointment,
        serviceTitle: props.service?.title,
        servicePrice: props.service?.price,
        name: props.formData?.name,
        email: props.formData?.email,
        phone: props.formData?.phone,
        comment: props.formData?.comment,
      };

    const {mutateAsync: postBookingMutation, isError, isSuccess, isPending} = usePostBooking(bookingData)

    return(
        <section className={AppointmentStyle.summaryCt}>
            <img src={Scissor} alt="Scissor"/>
            <h2 className={AppointmentStyle.title}>Booking summary</h2>
            <article className={AppointmentStyle.selectedOptionsCt}>
                <div className={AppointmentStyle.barberSummaryCt} >
                    <img className={AppointmentStyle.choosedBarberImg} src={props.barber?.photo} alt={`Photo of the barber: ${props.barber?.name}`}/>
                    <p className='relative top-[-60px] font-title text-md'>{props.barber?.name}</p>
                </div>
                <div className={AppointmentStyle.selectedBookingDetailsCt}>
                    <ul>
                        <li>
                            <p>Date:</p>
                            <span>{props.date?.date}
                                <span className='ml-[1rem]'>{props.appointment}</span>
                            </span>
                        </li>
                        <li>
                            <p>Service:</p>
                            <span>{props.service?.title}</span>
                        </li>
                        <li>
                            <p>Price:</p>
                            <span>{props.service?.price} $</span>
                        </li>
                    </ul>
                </div>
            </article>
            <div className='border-b-2 border-action w-[90%]'></div>
            <article className={AppointmentStyle.customerDetailsCt}>
                <h3 className='text-md sm:text-lg font-title mb-[3rem]'>Customer Information</h3>
                <div className={AppointmentStyle.customerDetails}>
                    <ul>
                        <li>
                            <p>Name:</p>
                            <span>{props.formData?.name}</span>
                        </li>
                        <li>
                            <p>E-mail:</p>
                            <span>{props.formData?.email}</span>
                        </li>
                        <li>
                            <p>Phone:</p>
                            <span className='tracking-[.2rem]'>{props.formData?.phone}</span>
                        </li>
                        <li>
                            <p>Comment:</p>
                            <span>{props.formData?.comment}</span>
                        </li>
                    </ul>
                </div>
            </article>
            <div className={AppointmentStyle.buttonBox}>
                <Button 
                    type='reset'
                    variant="contained"
                    size="sm"
                    onClick={() => {
                        if (
                        window.confirm(
                            "Are you sure you want to cancel your booking?"
                        )
                        ) {
                        window.location.reload();
                        window.scrollTo(0, 0);
                        }
                    }}
                >
                    Cancel
                </Button>
                <Button 
                    onClick={async () => {
                        try{
                            postBookingMutation();
                        }catch (e) {
                            console.error(e);
                        }
                    }} 
                    type='submit'>Confirm booking</Button>
            </div>
            <img className={AppointmentStyle.endLogoInSummary} src={summaryLogo} alt="Barber decoration graphic"/>
        </section>
    );
}