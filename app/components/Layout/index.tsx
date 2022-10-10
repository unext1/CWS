import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full min-h-screen selection:bg-brand-purple selection:text-white">
      <Navbar />
      <main className="flex-1 mt-10 text-white bg-brand-dark-900 md:mt-12">
        {children}
      </main>
    </div>
  );
};

export default Layout;
