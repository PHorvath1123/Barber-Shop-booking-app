import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useState } from 'react';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#1E1A17',
    border: '2px solid #D9D9D9',
    boxShadow: 24,
    color: '#D9D9D9',
    textAlign: 'center',
    p: 4,
  };

export default function ContactModal(){

    const [open, setOpen] = useState(true);
    const handleClose = () => setOpen(false);

    return(
        <Modal
        open={open}
        onClose={handleClose}
        >
            <Box sx={style}>
                <div className='flex flex-row justify-center gap-2'>
                    <CheckCircleOutlineIcon
                    sx={{color: '#EF6950'}}
                    fontSize='large'
                    />
                    <h1 className='mb-3 font-bold text-lg'>
                    Success!
                    </h1>
                </div>
                <div>Message sent successfully!</div>
            </Box>
        </Modal>

    );
};