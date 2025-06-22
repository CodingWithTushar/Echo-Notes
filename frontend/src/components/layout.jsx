import NavBar from "./navBar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-1 flex-col min-h-screen">
      <NavBar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Layout;
