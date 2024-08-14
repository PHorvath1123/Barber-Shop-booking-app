import HomeStyle  from '../styles/home/Home.module.css';
import Button from './ui/Button';
import ContactBackground from '/barber_shop_vertical.png'
import TextInput from './ui/TextInput';
import Textarea from '@mui/joy/Textarea';
import Checkbox from '@mui/joy/Checkbox';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HomeIcon from '@mui/icons-material/Home';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import { useState } from 'react';
import { z } from "zod";
import { usePostMessage } from '../hook/usePostMessage';


const schema = z.object({
    name: z.string(),
    email: z.string().email({message: 'must be a valid email address'}),
    message: z.string(),
    isChecked: z.boolean()
});

export type formData = z.infer<typeof schema>;

type ValidationError = {
    _errors: string[],
    email?: {_errors: string[]},
}

export default function Contact(){

    const [messageFormData, setMessageFormData] = useState<formData>({
        name:'', 
        email:'', 
        message:'', 
        isChecked:false});

    const [validationError, setValidationError] = useState<ValidationError>();
    
    const {sendMessage, isSuccessful} = usePostMessage();
   

    const handleSubmit =(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = schema.safeParse(messageFormData);

        if(!result.success) {
            const errors = result.error.format();
            setValidationError(errors);
        }
        else {
            sendMessage(result.data)
            setMessageFormData({name:'', email:'', message:'', isChecked:false});
            setValidationError({_errors:[]})
        }
    };

    return(
        <section className='relative flex flex-col items-center' id="Contact">
            <div className={HomeStyle.contactTitleCt}>
                <div className={HomeStyle.contactTitle}><span className='text-action font-title'>Contact</span> Information</div>
                <p className={HomeStyle.contactText}>Whether you have a question about our services, want to book an appointment, or just want to say hello, feel free to reach out to us.</p>
                <Button text="Book now"></Button>
                <div className='font-title text-xl mt-[3.4rem] mb-[2rem]'>OR</div>
            </div>
            <img className={HomeStyle.contactBg} src={ContactBackground} alt="contact background"/>
            <div className={HomeStyle.formAndInfoOuterCt}>
                <form className={HomeStyle.form} onSubmit={handleSubmit}>
                    <TextInput 
                        onChange={(e) => setMessageFormData((f) => ({...f, name: e.target.value}))} 
                        name='name' 
                        label='Name'
                        value = {messageFormData.name}
                    />   
                    <TextInput 
                        onChange={(e) => setMessageFormData((f) => ({...f, email: e.target.value}))} 
                        name='email' 
                        label='E-mail'
                        value= {messageFormData.email}
                    />  
                    {validationError?.email && <p className={HomeStyle.error}>{validationError?.email._errors[0]}</p>}
                    <Textarea
                        minRows={3}
                        placeholder="Your message..."
                        variant="outlined"
                        required
                        onChange={(e) => setMessageFormData((f) => ({...f, message: e.target.value}))}
                        value={messageFormData.message}
                        sx={{
                            background: 'transparent',
                            border: '1px solid #D9D9D9',
                            color: '#D9D9D9',
                            width: '100%',
                            '.MuiTextarea-textarea::placeholder':{
                                opacity: 1
                            },
                            '--Textarea-focusedThickness': '0rem',
                            '--Textarea-focusedHighlight': '#EF6950',
                            '&:focus-within': {
                                borderColor: '#EF6950',
                            },
                        }}
                    />
                    <Checkbox 
                    label="I agree to the terms of service and privacy policy." 
                    required
                    onChange={(e) => setMessageFormData((f) => ({...f, isChecked: e.target.checked}))}
                    checked={messageFormData.isChecked}
                    sx={{
                        '.MuiCheckbox-checkbox.Mui-checked':{
                            backgroundColor:'#EF6950',
                            color: '#D9D9D9',
                        },
                        '.MuiCheckbox-label':{
                            color: '#D9D9D9'
                        }
                    }}
                    />
                    <Button type='submit' text='Send'/>
                </form>
                <ul className={HomeStyle.infoList}>
                    <li className='flex items-center gap-3'>
                        <div className={HomeStyle.circle}>
                            <PhoneAndroidIcon></PhoneAndroidIcon>
                        </div>
                        <span>+49 1751210432</span>
                    </li>
                    <li className='flex items-center gap-3'>
                        <div className={HomeStyle.circle}>
                            <MailOutlineIcon></MailOutlineIcon>
                        </div>
                        <span>prestigecuts23@cuts.com</span>
                    </li>
                    <li className='flex items-center gap-3'>
                        <div className={HomeStyle.circle}>
                            <HomeIcon></HomeIcon>
                        </div>
                        <span>789 Maple Avenue, Rivertown, OH 43001, USA</span>
                    </li>
                    <li className='flex gap-3 items-start'>
                        <div className='flex items-center gap-3'>
                            <div className={HomeStyle.circle}>
                                <QueryBuilderIcon></QueryBuilderIcon>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <span>Opening hours:</span>
                            <p>Mo-Fr: 8 AM - 4 PM</p>
                            <p>Sa-Su: Closed</p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
};