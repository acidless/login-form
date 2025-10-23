import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import {Button, Flex, Form, Spin} from "antd";
import styles from "./CodeStep.module.css";
import {useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {sendCodeRequest, updateCodeRequest} from "../../api/CodeStep/CodeStepAPI.ts";
import {useErrorHandling} from "../../../../shared/model/useErrorHandling.ts";
import {CodeInputs} from "./CodeInputs.tsx";

const CODE_LENGTH = 6;
const CODE_EXPIRE_TIME = 10000;

type Props = {
    onSuccess: () => void;
}

const CodeStep = ({onSuccess}: Props) => {
    const [currentCode, setCurrentCode] = useState("");
    const [isCodeExhausted, setCodeExhausted] = useState(false);
    const {onError, contextHolder} = useErrorHandling();

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

    const {mutate: sendCode, isPending: isSendPending} = useMutation({
        mutationFn: sendCodeRequest,
        onSuccess: () => {
            onSuccess();
        },
        onError
    });

    const {mutate: updateCode, isPending: isUpdatePending} = useMutation({
        mutationFn: updateCodeRequest,
        onSuccess: (data) => {
            console.log("FOR DEBUG:", data);
            setNewCode();
        },
        onError
    });

    function setNewCode() {
        setCodeExhausted(false);
    }

    function handleSubmit() {
        sendCode({code: currentCode});
    }

    function onCodeUpdate() {
        updateCode();
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
        <CodeInputs codeSize={CODE_LENGTH} updateCode={setCurrentCode}/>
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