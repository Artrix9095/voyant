import { Providers } from '@/components/Providers';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
    component: () => (
        <Providers>
            <Outlet />
            <TanStackRouterDevtools />
        </Providers>
    ),
});
