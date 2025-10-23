import styles from "./LoginPage.module.css";
import {LoginStep} from "../LoginStep/LoginStep.tsx";
import {useState} from "react";
import {Flex, Image} from "antd";
import CodeStep from "../CodeStep/CodeStep.tsx";
import {ArrowLeftOutlined} from "@ant-design/icons";
import Title from "antd/es/typography/Title";

export function LoginPage() {
    const [currentStep, setCurrentStep] = useState<"login" | "code" | "finished">("login");

    function onLoginSuccess() {
        setCurrentStep("code");
    }

    function onCodeSuccess() {
        setCurrentStep("finished");
    }

    return <section className={styles.loginPage}>
        <div className={styles.loginFormContainer}>
            {currentStep === "code" &&
                <ArrowLeftOutlined className={styles.loginBack} onClick={() => setCurrentStep("login")}/>}
            <Flex className={styles.loginFormLogo}>
                <Image src="/logo.svg" alt="Company" preview={false}/>
            </Flex>
            {currentStep === "login" && <LoginStep onSuccess={onLoginSuccess}/>}
            {currentStep === "code" && <CodeStep onSuccess={onCodeSuccess}/>}
            {currentStep === "finished" && <Flex justify="center" align="center">
                <Title className={styles.loginSuccess}>You successfully logged in!</Title>
            </Flex>}
        </div>
    </section>;
}