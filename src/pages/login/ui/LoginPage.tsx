import {Button, Flex, Form, Image, Input, Typography} from "antd";
import styles from "./LoginPage.module.css";
import type {FieldType} from "../model/LoginPage.ts";
import {UserOutlined, LockOutlined} from "@ant-design/icons";

const {Title} = Typography;

export function LoginPage() {
    const [form] = Form.useForm();

    return <section className={styles.loginFormContainer}>
        <Form
            form={form}
            className={styles.loginForm}
            initialValues={{remember: true}}
            onFinish={() => {}}
            onFinishFailed={() => {}}
            autoComplete="off"
        >
            <Flex className={styles.loginFormLogo}>
                <Image src="./public/logo.svg" alt="Company" preview={false}/>
            </Flex>
            <Flex className={styles.loginFormTitle}>
                <Title level={1}>Sign in to your account to continue</Title>
            </Flex>
            <Form.Item<FieldType>
                className={styles.loginFormLine}
                name="email"
                rules={[{required: true, message: 'Please enter email!'},
                    {type: "email", message: 'This email is not valid'}]}
            >

                <Input prefix={<UserOutlined style={{color: "rgba(0,0,0,.45)"}}/>} size="large" placeholder="Email"/>
            </Form.Item>

            <Form.Item<FieldType>
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
        </Form>
    </section>;
}