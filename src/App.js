import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Redirect,
  Route,
} from "react-router-dom";
import "./App.css";
import Scribble from "./pages/Scribble";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import Footer from "./components/Footer";
import { useAuth } from "./utils/auth";

import { CSSTransition } from "react-transition-group";
import NavBurger from "./components/NavBurger";
import Navbar from "./components/Navbar";

function App() {
  const [showNav, setShowNav] = useState(false);
  const [unsaved, setUnsaved] = useState(false);
  // const [navTitle, setNavTitle] = useState("");
  const auth = useAuth();

  // Fix deps
  useEffect(() => {
    auth.checkSignedIn();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar
          setShowNav={setShowNav}
          // noteTitle={navTitle}
          unsaved={unsaved}
        />
        <CSSTransition
          in={showNav}
          timeout={300}
          classNames="slide-in-left"
          mountOnEnter
          unmountOnExit
        >
          <NavBurger setShowNav={setShowNav} />
        </CSSTransition>
        <Routes>
          <Route path="/" element={<Scribble setUnsaved={setUnsaved} />} />
          <Route
            path="/account"
            element={<Account />}
            onClick={() => setShowNav(false)}
          />
          <Route path="/settings" element={<Settings />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
