import { MainRoute } from "./routes/MainRoute";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import { useProduct } from "./hooks/useProducts";

function App() {
  // get all products from backend using custom hook
  useProduct();

  return (
    <div className="App">
      {/* Navbar */}
      <header>
        <Navbar />
      </header>
      {/* mainRoute for display all pages */}
      <main>
        <MainRoute />
      </main>
      {/* toast to show error message */}
      <ToastContainer position={toast.POSITION.TOP_CENTER} />
    </div>
  );
}

export default App;
