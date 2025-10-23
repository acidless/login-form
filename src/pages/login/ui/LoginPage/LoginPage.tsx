import styles from "./LoginPage.module.css";
import {LoginStep} from "../LoginStep/LoginStep.tsx";
import {useState} from "react";
import {Flex, Image} from "antd";
import CodeStep from "../CodeStep/CodeStep.tsx";
import {ArrowLeftOutlined} from "@ant-design/icons";

export function LoginPage() {
    const [currentStep, setCurrentStep] = useState<"login" | "code">("login");

    function onLoginFinish() {
        setCurrentStep("code");
    }

    return <section className={styles.loginPage}>
        <div className={styles.loginFormContainer}>
            {currentStep === "code" && <ArrowLeftOutlined className={styles.loginBack} onClick={() => setCurrentStep("login")}/>}
            <Flex className={styles.loginFormLogo}>
                <Image src="./public/logo.svg" alt="Company" preview={false}/>
            </Flex>
            {currentStep === "login" && <LoginStep onFinish={onLoginFinish}/>}
            {currentStep === "code" && <CodeStep/>}
        </div>
    </section>;
}