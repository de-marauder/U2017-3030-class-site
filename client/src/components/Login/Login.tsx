
import { useEffect, useState } from 'react';
import '../../App.css'
import { useNavigate } from 'react-router-dom';
import { FormInputType, TypeUserWithId } from '../../utils/types';
import { API } from '../../api/api';
import { checkCanSubmit, storeTokenAndUser } from '../../utils/functions';
import { Form } from '../../utils/reusableComponents/Form/Form';
import { Input } from '../../utils/reusableComponents/Input/Input';
import { ErrorMessageModal } from '../../utils/reusableComponents/ErrorMessgeModal';
import classes from './Login.module.css'
import { Button } from '../../utils/reusableComponents/Button/Button';


export default function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<Partial<FormInputType>>({
        email: '',
        matriculation_number: '',
        password: '',
    })
    const [canSubmit, setCanSubmit] = useState<boolean>(false)
    const [loginError, setLoginError] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<Partial<FormInputType>>({
        email: '',
        matriculation_number: '',
        password: '',
    })
    useEffect(() => {
        const token = window.localStorage.getItem('token')
        if (token && token != 'undefined' && token != 'null') return navigate('/user')
    })
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        // send link and other data to server
        const payload = {
            email: formData.email,
            matNo: formData.matriculation_number,
            password: formData.password,
        } as Required<typeof formData> & { matNo: string }

        await API.login(payload)
            .then(res => {
                console.log('res: ', res);
                const r = res.json()
                if (res.ok === false) { setLoginError('An error occured...'); }
                return r as Promise<{ status: string, message: string, data: { user: TypeUserWithId }, token: string }> | Promise<null>
            }).then((response) => {

                console.log(response)
                if (!response) return setLoginError('An error occured...');
                if (response && response.status === 'failed') return setLoginError(response.message || 'An error occured...');
                const { data } = response
                storeTokenAndUser(data.user, response.token)
                navigate('/user');
            })
            .catch((err) => console.log('Fetch error', err.message))
    }

    const LoginForm = (
        Object.entries(formData).map(([key, value], id) => {
            return (
                <div key={id}>
                    <Input k={key}
                        value={value}
                        checkCanSubmit={() => checkCanSubmit({ formData, setCanSubmit, setErrorMessage }, { isLogin: true })}
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
            <h1>Login</h1>
            <section className={classes.Login}>
                {loginError && <ErrorMessageModal onClick={()=>setLoginError('')} errorMessage={loginError} />}
                <Form>
                    <div >
                        {LoginForm}
                    </div>

                    {canSubmit ?
                        <Button style={buttonStyle} onClick={(e) => { handleSubmit(e) }}>Login</Button>
                        : <p>Fill the form above to submit</p>
                    }
                </Form>
            </section>
        </>
    )
}

