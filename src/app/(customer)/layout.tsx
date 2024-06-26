import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="w-full h-full">
      <section className="w-full h-full bg-white shadow shadow-black/10">
        <Navbar />
      </section>
      <section className="">{children}</section>
      <Footer />
    </main>
  );
}
