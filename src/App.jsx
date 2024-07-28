// import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollTop";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        {/* <HomeScreen /> */}
        <ScrollToTop />
        <Outlet />
      </main>
      <Footer />
      <ToastContainer theme="dark" />
    </>
  );
};

export default App;
