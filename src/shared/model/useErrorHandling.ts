import {message} from "antd";

export function useErrorHandling() {
    const [messageApi, contextHolder] = message.useMessage();

    function onError(err: Error) {
        messageApi.open({
            type: "error",
            content: err.message,
        });
    }

    return {onError, contextHolder};
}