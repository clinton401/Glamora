"use client";
import { useEffect } from 'react';
import { playfair } from './page';
import { Button } from '@/components/ui/button';
function ErrorPage({ error, reset }: { error: Error,  reset: () => void }) {
    useEffect(() => {
        console.error(`${error}`);
    }, [error]);
    return (
      <main className="h-dvh min-h-[400px] bg-background px-[5%] flex flex-col items-center gap-4 justify-center ">
        <h1
          className={`w-full text-center text-4xl font-bold font-playfair ${playfair.variable}`}
        >
          {error.message}
        </h1>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try Again
        </Button>
      </main>
    );
}
export default ErrorPage;