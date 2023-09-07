import { FunctionComponent, ReactElement, useEffect } from "react";
import { AppDispatch, AppState } from "../../store/store";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import styles from './TopicsPage.module.css';
import { getTopics } from "../../store/topics/topics.slice";
import Topics from "../../components/Topics/Topics";
import { Container } from "../../components/UI/Container/Container";

const TopicsPage: FunctionComponent = (): ReactElement => {

    const dispatch: AppDispatch = useDispatch();    
    const { topics, showError, errorMessage } = useSelector((state: AppState) => state.topics, shallowEqual);

    useEffect(() => {
        dispatch(getTopics());
    }, []);

    return (
        <Container>
            <div className={styles.topicsList}>
                <h2 className={styles.topicsHead}>Topics:</h2>
                {showError ? <p className={styles.errorMessage}>{errorMessage}</p> : null}
                {topics === undefined || !topics.length ?
                    <p>No topics</p>
                    :
                    <Topics topics={topics} />
                }
            </div>
        </Container>
    );
};

export default TopicsPage;
