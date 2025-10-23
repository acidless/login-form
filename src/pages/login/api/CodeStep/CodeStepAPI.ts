export async function sendCodeRequest({code}: { code: string }) {
    const res = await fetch("/api/code", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({code}),
    });

    if (!res.ok) {
        throw new Error("Invalid code");
    }

    return res.json();
}

export async function updateCodeRequest() {
    const res = await fetch("/api/code", {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
    });

    return res.json();
}