import { Modal } from "../Modal/Modal"
import classes from './Spinner.module.css';

export const BareSpinner = () => {
    return (
        <div className={classes.Spinner}></div>
    )
}

export const SpinnerModal = () => {
    return (
        <Modal onClick={()=>{}} closeable={false} >
            <div className={classes.Spinner}></div>
        </Modal>
    )
}