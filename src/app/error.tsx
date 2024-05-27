"use client";
import { useEffect } from 'react';
import { playfair } from './page';
function ErrorPage({ error }: { error: Error }) {
    useEffect(() => {
        console.error(`${error}`);
    }, [error]);
    return <main className="h-dvh min-h-[400px] bg-background px-[5%] flex items-center justify-center ">
<h1 className={`w-full text-center text-4xl font-bold font-playfair ${playfair.variable}`}>Failed to Fetch Products</h1>

    </main>
}
export default ErrorPage;