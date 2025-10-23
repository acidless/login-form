export async function loginRequest({ email, password }: { email: string; password: string }) {
    const res = await fetch("/api/authorization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        throw new Error("Invalid credentials");
    }

    return res.json();
}