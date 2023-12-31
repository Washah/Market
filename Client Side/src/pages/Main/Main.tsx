import Info from "../../components/Info";
import About from "../../components/About/About";
import { Login } from "../../components/Login/Login";
import "./Main.css";

const Main = () => {
  return (
    <div className="Main">
      <main>
        <Login />
      </main>
      <section>
        <About />
      </section>
      <aside>
        <Info />
      </aside>
    </div>
  );
};

export default Main;
