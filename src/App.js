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
import { useEffect } from "react";
import { useAuth } from "./utils/auth";

function App() {
  const auth = useAuth();

  // Fix deps
  useEffect(() => {
    auth.checkSignedIn();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Scribble />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/account" element={<Account />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
