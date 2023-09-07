import { FC, ReactElement } from "react";
import styles from './Message.module.css'
import IMessageWithUser from "../../interfaces/IMessage/IMessageWithUser";
import { shallowEqual, useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { formatDatetime } from "../../helpers/formatDatetime";

interface IMessageProps {
    message: IMessageWithUser
}

const Message: FC<IMessageProps> = ({message}): ReactElement => {
    const { user } = useSelector((state: AppState) => state.users, shallowEqual);
    return (
        <div className={styles.Message}>
            <div className={styles.Message_top}>
                <p className={styles.Message_author}>
                    {formatDatetime(message.datetime)} by <b className={styles.Message_accent}>
                    {message.user_id.login ? message.user_id.login : user?.login}
                    </b>
                </p>
            </div>
            <div className={styles.Message_bottom}>
                <p className={styles.Message_text}>{message.text}</p>
            </div>
        </div>
    );
};

export default Message;
