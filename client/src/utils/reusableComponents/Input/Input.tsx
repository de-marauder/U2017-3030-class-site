import { toTitleCase } from "../../functions"
import classes from './Input.module.css'

type FormType = Record<string, string>
type ErrorType = Record<string, string>
type InputComponentProps = {
    k: string,
    value: string,
    inputWrapperStyles?: Record<string, string>
    errorMessage: ErrorType,
    checkCanSubmit: (d: FormType) => boolean,
    setFormData: React.Dispatch<React.SetStateAction<Partial<FormType>>>,
    disabled?: boolean,
    type?: string
}
export const Input: React.FC<InputComponentProps> = ({ inputWrapperStyles, k, value, errorMessage, checkCanSubmit, setFormData, disabled, type }) => {
    return (
        <>
            <p id={k + ' input errorMessage'} style={{ color: 'red', fontSize: '.7em', textAlign: 'right' }}>{errorMessage[k as keyof typeof errorMessage]}</p>
            <div className={classes.InputWrapper} style={inputWrapperStyles}>
                <label className={classes.Label} style={{ paddingRight: '1rem', textAlign: 'left' }} htmlFor={k}>{k === 'dob' ? 'Date Of Birth' : toTitleCase(k)}</label>
                <input className={classes.Input} required disabled={disabled} name={k} type={type} value={type !== 'file' ? value : ''} onChange={(e) => {
                    setFormData((prevState) => {
                        prevState[k as keyof typeof prevState] = (e.target as HTMLInputElement).value
                        checkCanSubmit(prevState as Required<FormType>)
                        return { ...prevState }
                    })
                }} />
            </div>
        </>
    )
}