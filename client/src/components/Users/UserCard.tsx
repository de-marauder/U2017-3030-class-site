import { formatDate } from "../../utils/functions"
import { TypeUser } from "../../utils/types"
import portrait from '../../assets/images/Portrait_Placeholder.png'
import classes from './UserCard.module.css';

type UserCardProps = {
    el: Partial<TypeUser>
}
export const UserCard: React.FC<UserCardProps> = ({el}) => {
    return (
        <div className={classes.UserCard}>
            <div className={classes.UserCardImage}>
                <img src={el.img || portrait} alt="img" />
            </div>
            <div className={classes.UserCardDescription}>
                <p><span className={classes.DescLabel}>Name:</span> <span>{el.lastName && el.lastName}  {el.firstName && el.firstName} {el.otherName && el.otherName} </span> </p>
                <p><span className={classes.DescLabel}>E-mail:</span> <span>{el.email && el.email} </span></p>
                <p><span className={classes.DescLabel}>Phone:</span> <span> {el.phone && el.phone} </span></p>
                <p><span className={classes.DescLabel}>Mat. No.:</span> <span>{el.matNo && el.matNo}</span> </p>
                <p><span className={classes.DescLabel}>Date of birth:</span> <span>{el.dob && formatDate(el.dob, { normal: true })}</span> </p>
                <p><span className={classes.DescLabel}>LGA:</span> <span>{el.lga && el.lga} </span></p>
                <p><span className={classes.DescLabel}>State:</span> <span>{el.state && el.state} </span></p>
            </div>
        </div>
    )
}