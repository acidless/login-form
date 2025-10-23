import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import {Button, Flex, Form, Input, type InputRef, message, Spin} from "antd";
import styles from "./CodeStep.module.css";
import {useEffect, useRef, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {sendCodeRequest, updateCodeRequest} from "../../api/CodeStep/CodeStepAPI.ts";

const CODE_LENGTH = 6;
const CODE_EXPIRE_TIME = 5000;

type Props = {
    onSuccess: () => void;
}

const CodeStep = ({onSuccess}: Props) => {
    const inputsRef = useRef<InputRef[]>([]);
    const [currentCode, setCurrentCode] = useState("");
    const [isCodeExhausted, setCodeExhausted] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const {mutate: sendCode, isPending: isSendPending} = useMutation({
        mutationFn: sendCodeRequest,
        onSuccess: () => {
            onSuccess();
        },
        onError: (err: Error) => {
            messageApi.open({
                type: "error",
                content: err.message,
            });
        },
    });

    function onCodeUpdate() {
        updateCode();
    }

    const {mutate: updateCode, isPending: isUpdatePending} = useMutation({
        mutationFn: updateCodeRequest,
        onSuccess: (data) => {
            console.log("FOR DEBUG:", data);
            setNewCode();
        },
        onError: (err: Error) => {
            messageApi.open({
                type: "error",
                content: err.message,
            });
        },
    });

    useEffect(() => {
        let timeout = null;
        if (!isCodeExhausted) {
            timeout = setTimeout(() => {
                setCodeExhausted(true);
            }, CODE_EXPIRE_TIME);
        }

        return function () {
            if (timeout) {
                clearTimeout(timeout);
            }
        }
    }, [isCodeExhausted]);

    function setNewCode() {
        setCodeExhausted(false);
    }

    function inputToString() {
        return inputsRef.current.map((el) => el?.input?.value || "").join("");
    }

    function handleChange(index: number, e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.replace(/[^0-9A-Za-z]/g, "").toUpperCase();

        e.target.value = value;
        setCurrentCode(inputToString());
        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    }

    function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    }

    function handleSubmit() {
        sendCode({code: currentCode});
    }

    return <Form
        className={styles.loginForm}
        initialValues={{remember: true}}
        onFinish={handleSubmit}
        onFinishFailed={() => {}}
        autoComplete="off"
    >
        {contextHolder}
        <Flex className={styles.codeStepInfo} justify="center" align="center" vertical={true}>
            <Title className={styles.codeStepTitle} level={1}>Two-Factor Authentication</Title>
            <Text className={styles.codeStepText}>Enter the 6-digit code from the Google Authenticator app</Text>
        </Flex>
        <Flex align="center" gap={12} className={styles.codeStepInputs}>
            {Array.from({length: CODE_LENGTH}).map((_, i) => (
                <Input
                    key={i}
                    maxLength={1}
                    ref={(el) => {inputsRef.current[i] = el!}}
                    onChange={(e) => handleChange(i, e)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className={styles.codeInput}
                />
            ))}
        </Flex>
        {
            isCodeExhausted
                ? <Form.Item shouldUpdate style={{marginBottom: 0}} label={null}>
                    <Button
                        className={styles.codeStepBtn}
                        onClick={onCodeUpdate}
                        type="primary"
                        htmlType="button"
                        size="large">
                        Get new
                    </Button>
                </Form.Item>
                : <></>
        }
        {
            currentCode.length === CODE_LENGTH && !isCodeExhausted
                ? <Form.Item shouldUpdate style={{marginBottom: 0}} label={null}>
                    <Button
                        className={styles.codeStepBtn}
                        type="primary"
                        htmlType="submit"
                        size="large">
                        Continue
                    </Button>
                </Form.Item>
                : <></>
        }

        {(isSendPending || isUpdatePending) && <Flex justify="center" className="loader">
            <Spin/>
        </Flex>}
    </Form>;
}

export default CodeStep;