import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "../Button/Button";
import classes from './Navbar.module.css'
import { Logo } from "../Logo/Logo";

export const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const navigate = useNavigate();
    useEffect(() => {
        const token = window.localStorage.getItem('token')
        if (token && token != 'undefined' && token != 'null') {
            setIsLoggedIn(true)
            // return navigate('/user')
        }
    }, [isLoggedIn])

    return (
        <div className={classes.NavbarWrapper}>
            <nav className={classes.Navbar}>
                <div>
                    <Link to={'/'}>
                        <Logo />
                    </Link>
                </div>
                <div className={classes.Buttons}>
                    {isLoggedIn ? <Button onClick={() => navigate('/user')} >DashBoard</Button>
                        : (
                            <>
                                <div>
                                    <Button onClick={() => navigate('/login')}>Log in</Button>
                                </div>
                                <div>
                                    <Button onClick={() => navigate('/signup')}>Sign Up</Button>
                                </div>
                            </>
                        )
                    }
                </div>
            </nav>
        </div>
    )
}


type DashboardNavbarProps = { clearCreds: () => void }
export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ clearCreds }) => {
    // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const navigate = useNavigate();
    const style = {
        display: 'flex',
        gap: '1rem'
    }

    return (
        <div className={classes.NavbarWrapper}>
            <nav className={classes.Navbar}>
                <div>
                    <Link to={'/'}>
                        <Logo />
                    </Link>
                </div>
                <div style={style}>
                    <Button onClick={() => { navigate('/users') }}>Class Members</Button>
                    <Button style={{ backgroundColor: 'var(--red-color)' }} onClick={clearCreds}>Log out</Button>
                </div>
            </nav>
        </div>
    )
}