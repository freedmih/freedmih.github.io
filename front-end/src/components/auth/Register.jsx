import { Form, Input, Button, Checkbox } from 'antd';

import { useEffect } from "react";

import { useHistory } from "react-router-dom";

import API from '../../api/api';
import { message, Row, Typography } from "antd";

const { Link } = Typography;

const error = text => {
    message.error(text);
};

const Auth = props => {

    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            history.push('/');
        }
    }, []);

    const onFinish = async (values) => {
        try {
            const result = await API.post('/register', {
                login: values.username,
                password: values.password,
                passwordConfirmation: values.passwordConfirmation
            });

            const token = result.data.token;
            localStorage.setItem('jwt', token);
            history.push('/')
        }
        catch (err) {
            console.log(err.response.data.errors);
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
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
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
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Password confirm"
                    name="passwordConfirmation"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password confirmation!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Link onClick={() => history.push('/auth')}>
                        Already have an account?
                    </Link>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 10,
                        span: 14,
                    }}
                >
                    <Button type="primary" htmlType="submit" style={{width: '50%'}}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Row>
    );
}

export default Auth;