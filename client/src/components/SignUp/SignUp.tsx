
import { useEffect, useState } from 'react';
import '../../App.css'
import { useNavigate } from 'react-router-dom';
import { FailedResponse, FormInputType, TypeUser } from '../../utils/types';
import { API } from '../../api/api';
import { checkCanSubmit, storeTokenAndUser } from '../../utils/functions';
import { Form } from '../../utils/reusableComponents/Form/Form';
import { Input } from '../../utils/reusableComponents/Input/Input';
import { ErrorMessageModal } from '../../utils/reusableComponents/ErrorMessgeModal';
import { initialSignUpFormData } from '../../utils/vars';
import classes from './SignUp.module.css';
import { Button } from '../../utils/reusableComponents/Button/Button';
import { SpinnerModal } from '../../utils/reusableComponents/Spinner/Spinner';


type SignUpFormInputType = FormInputType & { confirmPassword: string };

export default function SignUp() {
    const navigate = useNavigate()
    const [canSubmit, setCanSubmit] = useState<boolean>(false)
    const [signUpError, setSignUpError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<Partial<SignUpFormInputType>>({ ...initialSignUpFormData })
    const [formData, setFormData] = useState<Partial<SignUpFormInputType>>({ ...initialSignUpFormData })

    useEffect(() => {
        const token = window.localStorage.getItem('token')
        if (token && token != 'undefined' && token != 'null') return navigate('/user')
    })
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setIsLoading(true)
        const payload = {
            matNo: formData.matriculation_number,
            email: formData.email,
            password: formData.password,
        } as SignUpFormInputType & { matNo: string };

        await API.signup(payload)
            .then(res => res.json())
            .then((r: FailedResponse & { data: { user: TypeUser }, token: string }) => {
                setIsLoading(false);
                if (!r) { setSignUpError('Bad response'); return }
                if (r.status === 'failed') setSignUpError(r.message)
                const { data, token } = r
                console.log(data.user, token);
                storeTokenAndUser(data.user, token);
                navigate('/user');
            })
            .catch((err) => {
                setIsLoading(false)
                setSignUpError('Error signing in')
                console.log('Fetch errorMessage', err.message)
            })
    }

    const SignUpForm = (
        Object.entries(formData).map(([key, value], id) => {
            console.log('key, value', key, value)
            return (
                <div key={id}>
                    <Input k={key}
                        value={value}
                        checkCanSubmit={() => checkCanSubmit({ formData, setCanSubmit, setErrorMessage }, { isSignup: true })}
                        setFormData={setFormData}
                        errorMessage={errorMessage}
                    />
                </div>
            )
        })
    )
    const buttonStyle = {
        backgroundColor: 'var(--dark-color)',
        color: 'var(--light-color)'
    }
    return (
        <>
            <h1>Sign Up</h1>
            {isLoading && <SpinnerModal />}
            {(signUpError && !isLoading) && <ErrorMessageModal onClick={() => setSignUpError('')} errorMessage={signUpError} />}
            <section className={classes.Signup}>
                <Form>
                    <div >
                        {SignUpForm}
                    </div>

                    {canSubmit ?
                        <Button style={buttonStyle} onClick={(e) => { handleSubmit(e) }}>Sign up</Button>
                        : <p>Fill the form above to submit</p>
                    }
                </Form>
            </section>
        </>
    )
}


export type UserType = Omit<FormInputType, 'files' | 'fname' | 'lname' | 'oname'> &
{
    img: string
    firstName: string,
    lastName: string,
    otherName: string,
}

