import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div className="bg-gray-900 ">
        <ToastContainer />
        <Navigation />
        <main className="py-3">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
