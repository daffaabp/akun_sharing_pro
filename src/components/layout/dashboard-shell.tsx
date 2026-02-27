import Header from './header';
import Sidebar from './sidebar';

export function DashboardShell({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex bg-[#f5f7f8] dark:bg-[#101922]">
            <Sidebar />
            <div className="relative flex w-full flex-col overflow-hidden">
                <Header />
                <main className="flex-1 px-6 py-8 lg:px-8 w-full">{children}</main>
            </div>
        </div>
    );
}
