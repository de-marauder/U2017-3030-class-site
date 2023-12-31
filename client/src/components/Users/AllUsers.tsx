import { useEffect, useRef, useState } from "react"
import { TypeUser, TypeUserWithId } from "../../utils/types"
import { API } from "../../api/api"
import { UserCard } from "./UserCard"
import classes from './AllUsers.module.css'
import { ImageWrapper } from "../../utils/reusableComponents/ImageWrapper"
import uniportLogo from '../../assets/images/uniport_logo.png';
import { Button } from "../../utils/reusableComponents/Button/Button"
import ReactToPrint from "react-to-print"
import { ErrorMessageModal } from "../../utils/reusableComponents/ErrorMessgeModal"
import { SpinnerModal } from "../../utils/reusableComponents/Spinner/Spinner"


export const AllUsers = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [users, setUsers] = useState<TypeUser[]>()
    const printableContent = useRef(null)
    useEffect(() => {
        setIsLoading(true)
        API.getAllUsers().then((res) => res.json())
            .then((response: { data: { users: TypeUserWithId[] }, status: 'success' | 'failed', message: string }) => {
                console.log('response: ', response)
                if (response.status === 'failed' || !response?.data?.users) setErrorMessage(response.message || 'Error getting class members')
                setUsers([...response.data.users]);
                setIsLoading(false)
            }).catch((err: Error) => {
                setIsLoading(false)
                setErrorMessage(err.message || 'Something went wrong')
            })
    }, [])
    // console.log('users: ', typeof users, users)
    const logoWrapperStyles = {
        maxWidth: '150px',
        maxHeight: '150px',
        margin: '1rem auto'
    }
    const buttonStyles = {
        position: 'fixed',
        top: '2rem',
        zIndex: '1001'
    }

    const Counter = () => {
        const styles = {
            backgroundColor: 'var(--light-color)',
            borderRadius: 'var(--border-radius)',
            color: 'var(--dark-color)',
            width: 'fit-content',
            margin: 'auto',
            padding: '10px'
        }
        return <div style={styles}><strong>{users ? users.length : 0} Students</strong></div>
    }
    return (
        <div className={classes.AlbumWrapper}>
            <Counter/>
            <ReactToPrint
                content={() => printableContent.current}
                trigger={() => <Button style={buttonStyles} onClick={() => { window.print() }}>Print</Button>}
            />
            {isLoading && <SpinnerModal />}
            {(errorMessage && !isLoading) && <ErrorMessageModal onClick={() => setErrorMessage('')} errorMessage={errorMessage} />}
            <div ref={printableContent} className={classes.Album}>
                <h2>Chemical Engineering UNIPORT</h2>
                <ImageWrapper style={logoWrapperStyles} imageLink={uniportLogo} imageAlt="uniport logo" />
                <h2>U2017 Class Album</h2>
                <div className={classes.Members}>
                    {users && users.map((el, id) => {
                        return (
                            <UserCard key={id} el={el} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
} 