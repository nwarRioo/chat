import ITopicGetDto from "../../../interfaces/ITopic/ITopicGetDto";

interface ITopicProps {
    topic: ITopicGetDto
}


const Topic: React.FunctionComponent<ITopicProps> = ({topic}) => {
    return (
        <div>
            <h1>{topic.name}</h1>
        </div>
    );
};

export default Topic;
