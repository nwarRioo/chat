import { FunctionComponent, ReactElement, useEffect } from "react";
import { AppDispatch, AppState } from "../../store/store";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import './TopicsPage.css';
import { getTopics } from "../../store/topics/topics.slice";
import Topics from "../../components/Topics/Topics";

const TopicsPage: FunctionComponent = (): ReactElement => {

    const dispatch: AppDispatch = useDispatch();    
    const { topics, showError, errorMessage } = useSelector((state: AppState) => state.topics, shallowEqual);

    useEffect(() => {
        dispatch(getTopics());
    }, []);

    return (
        <div className="TopicsPage-container">
            <div className="TopicsPage-background TopicsPage-flex-row">
                <div className="TopicsPage-column">
                    <h2 className="TopicsPage-title">Topics:</h2>
                    {showError ? <p className='TopicsPage-error-text'>{errorMessage}</p> : null}
                    {topics === undefined || !topics.length ?
                        <p className='TopicsPage-error-text'>No topics</p>
                        :
                        <Topics topics={topics} />
                    }
                </div>
            </div>
        </div>
    );
};

export default TopicsPage;
