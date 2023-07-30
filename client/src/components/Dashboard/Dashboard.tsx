import { useNavigate } from "react-router-dom"
import { DashboardNavbar } from "../../utils/reusableComponents/Navbar/Navbar"
import { ReactNode } from "react"
import classes from './Dashboard.module.css'
import { Floater } from "../../utils/reusableComponents/Floaters/Floater"

export const Dashboard: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate()
    const clearCreds = () => {
        window.localStorage.clear();
        navigate('/')
    }
    return (
        <div className={classes.Dashboard}>
            <Floater>
                <DashboardNavbar clearCreds={clearCreds} />
                <div className={classes.DashboardLayout}>
                    {/* <Sidebar/> */}
                    {children}
                </div>
            </Floater>
        </div>
    )
} 