import styles from "./LoginPage.module.css";
import {LoginStep} from "../LoginStep/LoginStep.tsx";
import {useState} from "react";
import {Flex, Image} from "antd";
import CodeStep from "../CodeStep/CodeStep.tsx";
import {ArrowLeftOutlined} from "@ant-design/icons";

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
                <Image src="./public/logo.svg" alt="Company" preview={false}/>
            </Flex>
            {currentStep === "login" && <LoginStep onSuccess={onLoginSuccess}/>}
            {currentStep === "code" && <CodeStep onSuccess={onCodeSuccess}/>}
        </div>
    </section>;
}