import { useState } from "react";

import { Constants } from "../../constants";
import { USER_ID } from "../../api/constants";

import API from "./../../api/api";

import { Input, message } from 'antd';
import { useTranslation } from "react-i18next";

const error = text => {
    message.error(text);
};

export default function FormInput({ isValidTitle, receiveTasks }) {
    const [titleTask, setTitleTask] = useState(Constants.EMPTY_STRING);
    const [loading, setLoading] = useState(false);

    const {t,i18n} = useTranslation();

    const addTask = async titleTask => {
        const validResult = isValidTitle(titleTask);

        if (!validResult.result) {
            error(t(validResult.message));
            return false;
        }

        try {
            setLoading(true);
            await API.post(`task/`, {
                name: titleTask,
                done: false
            },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                        'Accept-Language': i18n.language
                    }
                }
            )
            setTitleTask(Constants.EMPTY_STRING);
            receiveTasks();
        }
        catch (e) {
            const errorMessage = e.response.data.errors[0];
            error(errorMessage);
        }
        finally {
            setLoading(false);
        }
    }

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            addTask(titleTask);
        }
    }



    return (
        <div className="input-container">
            <Input className="add-task-input" type="text" placeholder="I want to..."
                onKeyDown={e => handleKeyDown(e)} value={titleTask} onChange={e => setTitleTask(e.target.value)} disabled={loading} />
        </div>
    )
}