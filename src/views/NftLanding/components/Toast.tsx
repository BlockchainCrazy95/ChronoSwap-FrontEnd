import React, { forwardRef } from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props : any, ref : any) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toast = (props) => {
    const { open, message, handleClose, type } = props
    const vertical = "top"
    const horizontal = "right"
    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
            <Alert onClose={handleClose} severity={type===1?"success":"error"} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Toast;