import ITopicGetDto from '../../interfaces/ITopic/ITopicGetDto';
import Topic from './Topic/Topic';

interface ITopicsProps {
    topics: ITopicGetDto[]
}


const Topics: React.FunctionComponent<ITopicsProps> = ({topics}) => {
    return (
        <>
            {topics.map((topic) => {
                return <Topic
                    key={topic.id}
                    topic={topic}
                />
            })}
        </>
    );
};

export default Topics;
