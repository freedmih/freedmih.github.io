import { Form, Input, Button, Checkbox } from 'antd';

import { useHistory } from "react-router-dom";

import API from '../../api/api';
import { message, Row, Typography } from "antd";
import { useEffect } from 'react';

import {useTranslation} from "react-i18next";

import {
    HashRouter as Router,
    Redirect
} from "react-router-dom";

const { Title, Link } = Typography;

const error = text => {
    message.error(text);
};

const Auth = ({ isAuth, setAuth }) => {

    const {t} = useTranslation();
    const history = useHistory();

    if (isAuth) {
        return <Redirect to='/' />
    }

    const onFinish = async (values) => {
        try {
            const result = await API.post('/auth', {
                login: values.username,
                password: values.password
            });

            const token = result.data.token;
            localStorage.setItem('jwt', token);
            setAuth(true);
        }
        catch (err) {
            error(err.response.data.errors[0]);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row type="flex" justify="center" align="top" style={{ minHeight: '100vh', marginTop: '50px' }}>
            <Form
                name="basic"
                labelCol={{
                    span: 10,
                }}
                wrapperCol={{
                    span: 14,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label={t('username')}
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: t('input_login'),
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={t('password')}
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: t('input_password'),
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                    <Link onClick={() => history.push('/register')}>
                        {t('go_to_register')}
                    </Link>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 10,
                        span: 14,
                    }}
                >
                    <Button type="primary" htmlType="submit" style={{ width: '50%' }}>
                        {t('submit_auth')}
                    </Button>
                </Form.Item>
            </Form>
        </Row>
    );
}

export default Auth;