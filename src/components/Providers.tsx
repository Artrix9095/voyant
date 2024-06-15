import { NextUIProvider } from '@nextui-org/react';
import type React from 'react';
import { useNavigate } from '@tanstack/react-router';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();

    return (
        <NextUIProvider navigate={navigate as any}>
            <main className='spring-dark min-h-screen bg-background text-foreground'>
                {children}
            </main>
        </NextUIProvider>
    );
};
