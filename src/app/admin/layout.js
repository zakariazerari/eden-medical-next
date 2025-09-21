
import "../globals.css"; 
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Admin Panel | Eden Medical",
  description: "Secure Admin Dashboard for Eden Medical",
};

export default function AdminLayout({ children }) {
  return (
    <section className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />
     
      {children}
    </section>
  );
}
