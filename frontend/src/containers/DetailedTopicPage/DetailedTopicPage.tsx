import { FC, ReactElement, useEffect } from 'react';
import styles from './DetailedTopicPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, AppState } from '../../store/store';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { checkToken } from '../../store/users/users.slice';
import { getTopicById } from '../../store/topics/topics.slice';

const DetailedTopicPage: FC = (): ReactElement => {
    const dispatch: AppDispatch = useDispatch();
    const { detailedTopic } = useSelector((state: AppState) => state.topics, shallowEqual);
    const params = useParams()

    useEffect(() => {
        dispatch(checkToken());
        if (params.id) {
            dispatch(getTopicById(params.id as string))
        };
    }, []);

    return (
        <div className={styles.DetailedTopicPage}>
            <h1>{detailedTopic.name}</h1>
        </div>
    )
};

export default DetailedTopicPage;
