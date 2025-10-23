import {http, HttpResponse} from "msw";

const CODE_SIZE = 6;

let code = generateCode();

function generateCode() {
    const digits = '0123456789';
    let code = '';
    for (let i = 0; i < CODE_SIZE; i++) {
        code += digits[Math.floor(Math.random() * digits.length)];
    }

    return code;
}

export const handlers = [
    http.post<never, { email: string, password: string }>("/api/authorization", async ({request}) => {
        const {email, password} = await request.json();

        if (email === "test@example.com" && password === "12345678") {
            return HttpResponse.json({
                success: true,
                code
            });
        }

        return HttpResponse.json({message: "Invalid email or password"}, {status: 401});
    }),

    http.post<never, { code: string }>("/api/code", async ({request}) => {
        const {code: enteredCode} = await request.json();

        if (code === enteredCode) {
            return HttpResponse.json({
                user: {id: 1, name: "Test User"},
            });
        }

        return HttpResponse.json({message: "Invalid code"}, {status: 401});
    }),

    http.put<never>("/api/code", async () => {
        code = generateCode();

        return HttpResponse.json({success: true, code});
    }),
];
