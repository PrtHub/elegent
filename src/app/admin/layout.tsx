import MobileNavbar from "./_components/mobile-navbar";
import Sidebar from "./_components/sidebar";

export const dynamic = 'force-dynamic';

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="w-full h-full relative bg-gray-50">
      <section className="w-64 h-full fixed left-0 top-0 md:block hidden z-20">
        <Sidebar />
      </section>
      <section className="w-full h-16 absolute top-0 left-0 right-0 md:hidden z-20">
        <MobileNavbar />
      </section>
      <section className="md:ml-64 z-10">{children}</section>
    </main>
  );
}
