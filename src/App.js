import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import GlobalStyle from "./styles/globalStyles";
import Scribble from "./pages/Scribble";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import { useAuth } from "./utils/auth";
import Navbar from "./components/Navbar";

function App() {
  const [unsaved, setUnsaved] = useState(false);
  const [user, setUser] = useState(null);
  const [navTitle, setNavTitle] = useState("");
  const auth = useAuth();

  useEffect(() => {
    if (!user) {
      console.log("Checking user signin");
      auth.checkSignedIn();
      setUser(auth.user);
    }
  }, [auth, setUser, user]);

  return (
    <div className="App">
      <Router>
        <Navbar unsaved={unsaved} navTitle={navTitle} />
        <GlobalStyle />
        <Routes>
          <Route
            path="/"
            element={
              <Scribble setUnsaved={setUnsaved} setNavTitle={setNavTitle} />
            }
          />
          <Route path="/account" element={<Account />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
