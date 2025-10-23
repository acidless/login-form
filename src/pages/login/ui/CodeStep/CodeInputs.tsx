import styles from "./CodeStep.module.css";
import {Flex, Input, type InputRef} from "antd";
import {useRef} from "react";

type Props = {
    codeSize: number;
    updateCode: (code: string) => void;
}

export const CodeInputs = function ({codeSize, updateCode}: Props) {
    const inputsRef = useRef<InputRef[]>([]);

    function handleChange(index: number, e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.replace(/[^0-9A-Za-z]/g, "").toUpperCase();

        e.target.value = value;
        updateCode(inputToString());
        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    }

    function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    }

    function inputToString() {
        return inputsRef.current.map((el) => el?.input?.value || "").join("");
    }

    return <Flex align="center" gap={12} className={styles.codeStepInputs}>
        {Array.from({length: codeSize}).map((_, i) => (
            <Input
                key={i}
                maxLength={1}
                ref={(el) => {inputsRef.current[i] = el!}}
                onChange={(e) => handleChange(i, e)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={styles.codeInput}
            />
        ))}
    </Flex>;
}