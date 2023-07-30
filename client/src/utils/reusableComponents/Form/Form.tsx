import { ReactNode } from "react"
import classes from './Form.module.css'
type FormProps = {
    children: ReactNode
}

export const Form: React.FC<FormProps> = ({ children }) => {
    return (
        <div className={classes.FormWrapper}>
            <form className={classes.Form}>
                {children}
            </form>
        </div>
    )
}