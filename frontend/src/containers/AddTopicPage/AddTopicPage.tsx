import React, { ChangeEvent, FC, ReactElement, useState } from "react";
import './AddTopicPage.css';
import { useNavigate } from "react-router-dom";
import { AppDispatch, AppState } from "../../store/store";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import DarkButton from "../../components/UI/DarkButton/DarkButton";
import ITopicCreateDto from "../../interfaces/ITopic/ITopicCreateDto";
import { addTopic, clearErrors, getTopics } from "../../store/topics/topics.slice";

const AddTopicPage: FC = (): ReactElement => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const { showAddError, errorAddMessage } = useSelector((state: AppState) => state.topics, shallowEqual);
    const [TitleErrorMessage, setTitleErrorMessage] = useState<string>('');
    const [inputValues, setInputValues] = useState<ITopicCreateDto>({
        name: ''
    });

    const inputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        dispatch(clearErrors());
        setInputValues(prevState => {
            return {...prevState, [e.target.name]: e.target.value}
        });
    };

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValues.name.trim() === '') {
            setTitleErrorMessage('Name is required!')
            return;
        };
        dispatch(addTopic(inputValues));
        dispatch(getTopics());
        navigate('/');
    };

    return (
        <div className="AddPostPage-container">
            <div className="AddPostPage-background AddPostPage-flex-row">
                <div className="AddPostPage">
                    <h2 className="AddPostPage-title">Add new post:</h2>
                    <div className="AddPostPage-form-column">
                        {showAddError ? <p className='AddPostPage-error-text'>{errorAddMessage}</p> : null}
                        <form onSubmit={submitHandler} className="">
                            <div className="AddPostPage-form-box">
                                <label className="AddPostPage-label" htmlFor='name'>Name:</label>
                                <p className='AddPostPage-error-text'>{TitleErrorMessage}</p>
                                <input className={'AddPostPage-input'}
                                    type="text"
                                    onChange={inputHandler}
                                    name={'name'}
                                    value={inputValues.name}
                                />
                                <DarkButton
                                    label={'Create topic'}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTopicPage
