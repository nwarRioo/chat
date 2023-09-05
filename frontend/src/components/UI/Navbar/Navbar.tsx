import { FunctionComponent, ReactElement, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from './Navbar.module.css';
import Logo from "../Logo/Logo";

const Navbar: FunctionComponent = (): ReactElement => {

    const logoutHandler = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    useEffect(() => {
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Logo />
                <nav className={styles.nav_links_row}>
                        <>
                            <span className={styles.nav_username}>
                                USERNAME
                            </span>
                            <button className={styles.nav_link} onClick={logoutHandler}>Logout</button>
                        </>
                        <>
                            <NavLink className={styles.nav_link} to={'/register'}>Register</NavLink>
                            <NavLink className={styles.nav_link} to={'/login'}>Login</NavLink>
                        </>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
