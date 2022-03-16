import { Form, Input, Button, Checkbox } from 'antd';

import { useEffect } from "react";

import { useHistory } from "react-router-dom";

import API from '../../api/api';
import { message, Row, Typography } from "antd";

import {
    HashRouter as Router,
    Redirect
  } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const { Link } = Typography;

const error = text => {
    message.error(text);
};

const Auth = ({isAuth, setAuth}) => {

    const history = useHistory();
    const {t, i18n} = useTranslation();

    if(isAuth) {
        return <Redirect to='/'/>
    }

    const onFinish = async (values) => {
        try {
            const result = await API.post('/register', {
                login: values.username,
                password: values.password,
                passwordConfirmation: values.passwordConfirmation
            },
            {
                headers: {
                    "Accept-Language": i18n.language
                }
            }
            );

            const token = result.data.token;
            localStorage.setItem('jwt', token);
            setAuth(true);
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
                    span: 12,
                }}
                wrapperCol={{
                    span: 12,
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

                <Form.Item
                    label={t('password_confirm')}
                    name="passwordConfirmation"
                    rules={[
                        {
                            required: true,
                            message: t('input_password_confirmation'),
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 12, span: 12 }}>
                    <Link onClick={() => history.push('/auth')}>
                        {t('go_to_auth')}
                    </Link>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 12,
                        span: 12,
                    }}
                >
                    <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                        {t('submit_register')}
                    </Button>
                </Form.Item>
            </Form>
        </Row>
    );
}

export default Auth;