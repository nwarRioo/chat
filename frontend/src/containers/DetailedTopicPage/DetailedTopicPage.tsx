import { FC, ReactElement, useEffect } from 'react';
import styles from './DetailedTopicPage.module.css';
import { useParams } from 'react-router-dom';
import { AppDispatch, AppState } from '../../store/store';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { checkToken } from '../../store/users/users.slice';
import { getTopicById } from '../../store/topics/topics.slice';
import { Container } from '../../components/UI/Container/Container';
import { getMessagesByTopicId } from '../../store/messages/messages.slice';
import AddMessageForm from '../../components/AddMessageForm/AddMessageForm';

const DetailedTopicPage: FC = (): ReactElement => {
    const dispatch: AppDispatch = useDispatch();
    const { detailedTopic } = useSelector((state: AppState) => state.topics, shallowEqual);
    const params = useParams()
    const { messages } = useSelector((state: AppState) => state.messages, shallowEqual);

    useEffect(() => {
        dispatch(checkToken());
        if (params.id) {
            dispatch(getMessagesByTopicId(params.id as string))
            dispatch(getTopicById(params.id as string))
        };
    }, []);

    const { isAuth } = useSelector((state: AppState) => state.users, shallowEqual);

    return (
        <Container>
            <div className={styles.DetailedTopicPage}>
                <h1>{detailedTopic.name}</h1>
                {!messages.length ?
                    <h2>No messages yet</h2>
                    : null
                }
                <div className="AddCommentBlock">
                    {isAuth ? <AddMessageForm /> : null}
                </div>
            </div>
        </Container>
        
    )
};

export default DetailedTopicPage;
