import { ReactNode } from "react"
import classes from './Modal.module.css';

type ModalProps = { children: ReactNode, onClick: () => void, closeable?: boolean }
export const Modal: React.FC<ModalProps> = ({ children, onClick, closeable }) => {
    return (
        <div onClick={() => onClick()} className={`${classes.ModalWrapper}  ${classes.Backdrop}`}>
            <div onClick={(e) => {
                e.stopPropagation()
            }} className={classes.Modal}>
                {closeable ?? <div onClick={onClick} className={classes.CloseModal}>x</div>}
                {children}
            </div>
        </div>
    )
}
