import React, { FC, ReactElement, useState } from 'react';
import styles from './AddMessageForm.module.css'
import { useParams } from 'react-router-dom';
import { AppDispatch, AppState } from '../../store/store';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import DarkButton from '../UI/DarkButton/DarkButton';
import IMessageCreateDto from '../../interfaces/IMessage/IMessageCreateDto';
import { addMessage, clearErrors } from '../../store/messages/messages.slice';

const AddMessageForm: FC= (): ReactElement => {
    const params = useParams()
    const dispatch: AppDispatch = useDispatch()
    const [message, setMessage] = useState<IMessageCreateDto>({
        topic_id: '',
        text: ''
    });
    
    const {showAddError, errorAddMessage } = useSelector((state: AppState) => state.messages, shallowEqual);
    const [count, setCount] = useState(0)
    const textareaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        dispatch(clearErrors)
        setCount(e.target.value.length)
        setMessage(prevState => {
            return {
                ...prevState, [e.target.name]: e.target.value,
                topic_id: params.id as string
            }
        });
    };

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(clearErrors())
        dispatch(addMessage(message));
        setMessage({
            topic_id: '',
            text: ''
        })
    };

    return (
        <form className={styles.AddMessageForm} onSubmit={submitHandler}>
            {showAddError ? <p>Status: {errorAddMessage}</p> : null}
            <div className={styles.AddMessageForm__top}>
                <textarea
                    onChange={textareaHandler}
                    className={styles.AddMessageForm__textarea}
                    placeholder='Write message'
                    name={'text'}
                    value={message.text}
                    maxLength={333}
                ></textarea>
            </div>
            <div className={styles.AddMessageForm__bottom}>
                <DarkButton label='Send'></DarkButton>
                <h3 className={styles.AddMessageForm__bottom_text}>New message</h3>
                <span className={styles.AddMessageForm__count}>{count}/333</span>
            </div>
        </form>
    );
};

export default AddMessageForm;
