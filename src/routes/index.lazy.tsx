import { createLazyFileRoute } from '@tanstack/react-router';
import { settings } from '@/lib/databases/offline';
import '@/lib/watcher';

export const Route = createLazyFileRoute('/')({
    component: Index,
});

function Index() {
    return (
        <div className='p-2'>
            <h3>Hello World</h3>
        </div>
    );
}
