import { useState } from "react";
import { GetStringDateByTime } from "../../utils/date";

import { message, Row, Col, Input, Checkbox } from 'antd';

import API from './../../api/api';
import { Card, Button } from 'antd';


import { USER_ID } from "../../api/constants";

import { Typography, Space } from 'antd';

const { Text } = Typography;

const GetMarkedTitle = (title, isDone) => isDone ? <Text><s>{title}</s></Text> : <Text>{title}</Text>


const error = text => {
    message.error(text);
};

export default function Task({ task, isValidTitle, receiveTasks }) {
    const [editStatus, setEditStatus] = useState(false);
    const [editText, setEditText] = useState(task.name);
    const [loading, setLoading] = useState(false);

    const toggleEditMode = () => {
        setEditStatus(true);
    }

    const updateTask = async task => {
        try {
            await API.patch(`task/${task.uuid}`, {
                ...task
            },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            }
            )
            receiveTasks();
        }
        catch (e) {
            console.log(e.response.data.errors);
            const errorMessage = e.response.data.errors[0];
            error(errorMessage);
            setLoading(false);
        }
    }

    const handleInput = event => {
        if (event.key === "Enter") {
            const validResult = isValidTitle(editText);

            if (!validResult.result) {
                error(validResult.message);
                return;
            }

            updateTask({
                uuid: task.uuid,
                name: editText
            });

            setEditStatus(false);

            return;
        }

        if (event.key === "Escape") {
            setEditText(task.name);
            setEditStatus(false);
        }
    }

    const removeTask = async uuid => {
        try {
            setLoading(true);
            await API.delete(`task/${uuid}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            });
            receiveTasks();
        }
        catch (e) {
            const errorMessage = e.response.data.message;
            error(errorMessage);
            setLoading(false);
        }
    }

    const handleDelete = async (e, uuid) => {
        e.stopPropagation();
        setLoading(async () => {
            await removeTask(uuid);
            return true;
        });
    }

    const details = editStatus ?
        <Input onBlur={() => setEditStatus(false)} autoFocus type="text" onKeyDown={e => handleInput(e)}
            value={editText} onChange={e => setEditText(e.target.value)} disabled={loading} />
        : GetMarkedTitle(task.name, task.done)

    return (
        <Row gutter={16}>
            <Col span={24}>
                <Card onClick={() => toggleEditMode()} style={{margin: '5px 0'}}>
                    <Row justify="space-between" align="middle">
                        
                        <Space>
                            <Checkbox onClick={e => e.stopPropagation()} onChange={() => updateTask({ uuid: task.uuid, done: !task.done })} checked={task.done} />
                            {details}
                        </Space>
                        
                        <Space>
                            <Text>{GetStringDateByTime(task.createdAt)}</Text>
                            <Button danger onClick={e => handleDelete(e, task.uuid)} disabled={loading}>Delete</Button>
                        </Space>
                    </Row>
                </Card>
            </Col>
        </Row>
    )
}