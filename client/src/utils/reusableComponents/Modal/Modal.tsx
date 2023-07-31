import { ReactNode } from "react"
import classes from './Modal.module.css';

export const Modal: React.FC<{ children: ReactNode, onClick: () => void }> = ({ children, onClick }) => {
    return (
        <div onClick={() => onClick()} className={`${classes.ModalWrapper}  ${classes.Backdrop}`}>
            {/* <Backdrop onClick={onClick} /> */}
            <div onClick={(e) => {
                e.stopPropagation()
            }} className={classes.Modal}>
                <div onClick={onClick} className={classes.CloseModal}>x</div>
                {children}
            </div>
        </div>
    )
}


// type BackdropProps = { onClick: () => void }
// const Backdrop: React.FC<BackdropProps> = ({ onClick }) => {
//     return <div onClick={() => onClick()} className={classes.Backdrop} ></div>
// }