import styles from './Logo.module.css';
import { Link } from "react-router-dom";

const Logo: React.FunctionComponent = () => {
    return (
        <Link to={'/'} className={styles.logo}>
            <img src={"/chat.png"} alt="chat" className={styles.logo_img}/>
        </Link>
    );
};

export default Logo;
