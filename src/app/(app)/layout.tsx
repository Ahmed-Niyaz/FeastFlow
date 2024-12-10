import Footer from "@/customComponents/Footer";
import Navbar from "@/customComponents/Navbar";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
