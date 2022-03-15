import { Form, Input, Button, Checkbox } from 'antd';

import { useHistory } from "react-router-dom";

import API from '../../api/api';
import { message, Row, Typography } from "antd";
import { useEffect } from 'react';

import useLogin from "../../hooks/useLogin";

import {
    HashRouter as Router,
    Redirect
} from "react-router-dom";

const { Title, Link } = Typography;

const error = text => {
    message.error(text);
};

const Auth = ({ isAuth, setAuth }) => {

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
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
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
                    label="Password"
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

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Link onClick={() => history.push('/register')}>
                        Don't have an account?
                    </Link>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" style={{ width: '50%' }}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Row>
    );
}

export default Auth;