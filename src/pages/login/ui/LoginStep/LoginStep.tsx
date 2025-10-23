import {Button, Flex, Form, Input, Spin} from "antd";
import styles from "./LoginStep.module.css";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import {useMutation} from "@tanstack/react-query";
import {loginRequest} from "../../api/LoginStep/LoginStepAPI.ts";
import type {LoginStepForm} from "../../model/LoginStep/LoginStepModel.ts";
import {useErrorHandling} from "../../../../shared/model/useErrorHandling.ts";

type Props = {
    onSuccess: () => void;
}

export const LoginStep = ({onSuccess}: Props) => {
    const [form] = Form.useForm();
    const {onError, contextHolder} = useErrorHandling();

    const {mutate, isPending} = useMutation({
        mutationFn: loginRequest,
        onSuccess: (data) => {
            console.log("FOR DEBUG:", data);
            onSuccess();
        },
        onError
    });

    const onFinish = (values: LoginStepForm) => {
        mutate(values);
    };

    return <Form
        form={form}
        className={styles.loginForm}
        initialValues={{remember: true}}
        onFinish={onFinish}
        onFinishFailed={() => {}}
        autoComplete="off"
    >
        {contextHolder}
        <Flex className={styles.loginFormTitle}>
            <Title level={2}>Sign in to your account to continue</Title>
        </Flex>
        <Form.Item<LoginStepForm>
            className={styles.loginFormLine}
            name="email"
            rules={[{required: true, message: 'Please enter email!'},
                {type: "email", message: 'This email is not valid'}]}
        >

            <Input prefix={<UserOutlined style={{color: "rgba(0,0,0,.45)"}}/>} size="large" placeholder="Email"/>
        </Form.Item>

        <Form.Item<LoginStepForm>
            className={styles.loginFormLine}
            name="password"
            rules={[{required: true, message: 'Please enter password!'},
                {type: "string", min: 8, message: 'The password should be at least 8 characters'}]}
        >
            <Input.Password prefix={<LockOutlined style={{color: "rgba(0,0,0,.45)"}}/>} size="large"
                            placeholder="Password" autoComplete="password"/>
        </Form.Item>

        <Form.Item shouldUpdate style={{marginBottom: 0}} label={null}>
            {() => {
                const hasErrors = form
                    .getFieldsError()
                    .some(({errors}) => errors.length);
                const allFilled = Object.values(form.getFieldsValue()).every(Boolean);

                return (
                    <Button
                        className={styles.loginFormButton}
                        size="large"
                        type="primary"
                        htmlType="submit"
                        disabled={!allFilled || hasErrors}
                    >
                        Log in
                    </Button>
                );
            }}
        </Form.Item>

        {isPending && <Flex justify="center" className="loader">
            <Spin/>
        </Flex>}
    </Form>;
}