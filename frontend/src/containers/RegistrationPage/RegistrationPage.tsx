import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../../store/store';
import eye from '../../assets/img/eye.svg';
import eyeClosed from '../../assets/img/eye-closed.svg';
import DarkButton from '../../components/UI/DarkButton/DarkButton';
import './RegistrationPage.css';
import { clearError, register } from '../../store/users/users.slice';
import IUserCreateDto from '../../interfaces/IUser/IUserCreateDto';

const RegistrationPage: React.FunctionComponent = (): React.ReactElement => {
    const { isAuth, registerShowError, registerErrorMessage } = useSelector((state: AppState) => state.users, shallowEqual);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();
    const [passwordFieldErrorMessage, setPasswordFieldErrorMessage] = useState<string>('');
    const [usernameFieldErrorMessage, setUsernameFieldErrorMessage] = useState<string>('');
    const [passwordStatus, setPasswordStatus] = useState(false)
    const [passwordRepeatStatus, setPasswordRepeatStatus] = useState(false)
    const [userValues, setUserValues] = useState<IUserCreateDto & { password_repeat: string }>({
        login: '',
        password: '',
        password_repeat: ''
    });

    useEffect(() => {
            isAuth && navigate(location.state?.from ? location.state.from : '/')
    }, [isAuth])

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(clearError());
        setUsernameFieldErrorMessage('');
        setPasswordFieldErrorMessage('');
        setUserValues(prevState => {
            return { ...prevState, [e.target.name]: e.target.value }
        });
    };

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (userValues.login.trim() === '') {
            setUsernameFieldErrorMessage('Username is required!')
            return;
        }
        if (userValues.password.trim() === '') {
            setPasswordFieldErrorMessage('Password is required!')
            return;
        }
        if (userValues.password !== userValues.password_repeat) {
            setPasswordFieldErrorMessage('Passwords are diferent!')
            return;
        }
        dispatch(register(
            {
                login: userValues.login,
                password: userValues.password
            }
        ));
        isAuth && navigate(location.state?.from ? location.state.from : '/');
    };
    const changePasswordStatus = () => {
        setPasswordStatus(!passwordStatus)
    }

    const changePasswordRepeatStatus = () => {
        setPasswordRepeatStatus(!passwordRepeatStatus)
    }
    return (
        <div className="RegisterPage-container">
            <div className="RegisterPage-background RegisterPage-flex-row">
                <div className="RegisterPage-column">
                    <h3 className="RegisterPage-subtitle">Register:</h3>
                    {registerShowError ? <p className='RegisterPage-error-text'>{registerErrorMessage}</p> : null}
                    <div className="RegisterPage-form-column">
                        <form onSubmit={submitHandler}>
                            <div className="RegisterPage-form-box">
                                <label className="RegisterPage-label" htmlFor='login'>Login:</label>
                                <p className='RegisterPage-error-text'>{usernameFieldErrorMessage}</p>
                                <input className={'RegisterPage-input RegisterPage-input-password-name'}
                                    type="text"
                                    onChange={inputHandler}
                                    name={'login'}
                                    value={userValues.login}
                                />
                                <label className="RegisterPage-label" htmlFor='password'>Password:</label>
                                <p className='RegisterPage-error-text'>{passwordFieldErrorMessage}</p>
                                <label className='RegisterPage-label-password RegisterPage-input'>
                                    <input className={'RegisterPage-input-password RegisterPage-input-password-name'}
                                        type={passwordStatus ? 'text' : 'password'}
                                        onChange={inputHandler}
                                        name={'password'}
                                        value={userValues.password}
                                    />
                                    <img src={passwordStatus ? eyeClosed : eye} alt="eye" className='LoginPage-input-eye' onClick={changePasswordStatus}/>
                                </label>
                                <label className="RegisterPage-label" htmlFor='password_repeat'>Repeat password:</label>
                                <label className='RegisterPage-label-password RegisterPage-input'>
                                    <input className={'RegisterPage-input-password RegisterPage-input-password-name'}
                                        type={passwordRepeatStatus ? 'text' : 'password'}
                                        onChange={inputHandler}
                                        name={'password_repeat'}
                                        value={userValues.password_repeat}
                                    />
                                    <img src={passwordRepeatStatus ? eyeClosed : eye} alt="eye" className='LoginPage-input-eye' onClick={changePasswordRepeatStatus}/>
                                </label>
                                <DarkButton
                                    label={'Save'}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
