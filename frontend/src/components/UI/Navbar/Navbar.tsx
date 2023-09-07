import { FunctionComponent, ReactElement, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from './Navbar.module.css';
import Logo from "../Logo/Logo";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../../store/store";
import { initState } from "../../../store/users/users.slice";

const Navbar: FunctionComponent = (): ReactElement => {

    const { user, isAuth } = useSelector((state: AppState) => state.users, shallowEqual);
    const dispatch: AppDispatch = useDispatch();

    const logoutHandler = () => {
        localStorage.removeItem('token');
        dispatch(initState());
        window.location.reload();
    };


    useEffect(() => {
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Logo />
                
                <nav className={styles.nav_links_row}>
                        {isAuth && user ?
                        <>
                            <p className={styles.nav_username}>
                                {user.login}
                            </p>
                            <NavLink className={styles.nav_link} to={'/add-topic'}>Add new topic</NavLink>
                            <NavLink className={styles.nav_link} to={'/'}>Topics</NavLink>
                            <button className={styles.nav_link} onClick={logoutHandler}>Logout</button>
                            
                        </>
                        :
                        <>
                            <NavLink className={styles.nav_link} to={'/register'}>Register</NavLink>
                            <NavLink className={styles.nav_link} to={'/auth'}>Login</NavLink>
                        </>
                        }
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
