import { NextUIProvider } from '@nextui-org/react';
import type React from 'react';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <NextUIProvider>{children}</NextUIProvider>
);
