import { ReactNode } from "react"
import { Navbar } from "../../utils/reusableComponents/Navbar/Navbar"
import classes from "./HomeLayout.module.css"

export const HomeLayout: React.FC<{ children: ReactNode }> = ({ children }) => {

    return (
        <section className={classes.homeLayout}>
            <Navbar />
            <div className={classes.children}>
                {children}
            </div>
        </section>
    )
}