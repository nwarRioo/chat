import { useNavigate } from "react-router-dom";
import ITopicGetDto from "../../../interfaces/ITopic/ITopicGetDto";
import { AppDispatch, AppState } from "../../../store/store";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { MouseEvent, useEffect } from "react";
import styles from "./Topic.module.css"
import { checkToken } from "../../../store/users/users.slice";

interface ITopicProps {
    topic: ITopicGetDto
}


const Topic: React.FunctionComponent<ITopicProps> = ({topic}) => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const cklickHandler = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        navigate(`/topics/${topic._id}`);
    };

    useEffect(() => {
        dispatch(checkToken());
    }, []);

    return (
        <div className={styles.topic} onClick={cklickHandler}>
            <h1>{topic.name}</h1>
        </div>
    );
};

export default Topic;

