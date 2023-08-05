import { useNavigate } from "react-router-dom"
import { DashboardNavbar } from "../../utils/reusableComponents/Navbar/Navbar"
import { ReactNode, useEffect, useState } from "react"
import classes from './Dashboard.module.css'
import { Floater } from "../../utils/reusableComponents/Floaters/Floater"
import { API } from "../../api/api"
import { SpinnerModal } from "../../utils/reusableComponents/Spinner/Spinner"
import { ErrorMessageModal } from "../../utils/reusableComponents/ErrorMessgeModal"
import { storeTokenAndUser } from "../../utils/functions"
import { GetUserAPIResponse, TypeUserWithId } from "../../utils/types"

export const Dashboard: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState<TypeUserWithId>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const clearCreds = () => {
        setErrorMessage('')
        setIsLoading(true);
        API.logout().then((res) => res.json())
            .then((response: { status: 'success' } | { status: 'failed', message: string }) => {
                setIsLoading(false)
                if (response.status === 'failed') {
                    setErrorMessage(response.message)
                }
                else {
                    window.localStorage.clear();
                    navigate('/')
                }
            }).catch((error: Error) => {
                console.log(error);
                setIsLoading(false)
                setErrorMessage(error.message || 'Error logging out')
            })
    }
    useEffect(() => {
        setErrorMessage('')
        setIsLoading(true)
        const tkn = window.localStorage.getItem('token')
        const user = JSON.parse(window.localStorage.getItem('user') as string) as Required<TypeUserWithId> | null | undefined | ''
        if (!tkn || !user) return navigate('/login')
        const getUserApiTimeout = setTimeout(() => {

            API.getUser(user._id).then((res) => res.json()).then((response: GetUserAPIResponse) => {
                if (!response) { setErrorMessage('Could not retrieve user data'); return }
                if (response.status === 'failed' && response.message !== undefined) {
                    // setTimeout(()=>{
                    setIsLoading(false)
                    setErrorMessage(response.message || 'You are no longer logged in. Please login again')
                    window.localStorage.clear();
                    navigate('/login')
                    // }, 2000);
                    return
                }
                setUser(() => response.data?.user);
                storeTokenAndUser(user, tkn)

                setIsLoading(false)
            }).catch((e: Error) => {
                console.log(e)
                setIsLoading(false)
                setErrorMessage(e.message);
            });
        }, 0)
        return () => clearTimeout(getUserApiTimeout)
    }, [navigate]);
    return (
        <Floater>
            <div className={classes.Dashboard}>
                {isLoading && <SpinnerModal />}
                {(errorMessage && !isLoading) && <ErrorMessageModal onClick={() => setErrorMessage('')} errorMessage={errorMessage} />}
                {
                    user && (
                        <>
                            <DashboardNavbar clearCreds={clearCreds} user={user} />
                            <div className={classes.DashboardLayout}>
                                {/* <Sidebar/> */}
                                {children}
                            </div>
                        </>
                    )
                }
            </div>
        </Floater>
    )
} 