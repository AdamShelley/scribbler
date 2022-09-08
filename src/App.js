import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  replace,
} from "react-router-dom";

import "./App.css";
import GlobalStyle from "./styles/globalStyles";
import Scribble from "./pages/Scribble";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import { useAuth } from "./utils/auth";
import Navbar from "./components/Navbar";
import { getUserSettings } from "./utils/db";

function App() {
  const [unsaved, setUnsaved] = useState(false);
  const [user, setUser] = useState(null);
  const [navTitle, setNavTitle] = useState("");
  const [settings, setSettings] = useState("");
  const auth = useAuth();

  useEffect(() => {
    if (!user) {
      console.log("Checking user signin");
      auth.checkSignedIn();
      setUser(auth.user);
    }

    if (user) {
      // Check for user Settings
      const getSettings = async () => {
        const settings = await getUserSettings(auth.user.uid);
        setSettings(settings);
      };
      getSettings();
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
              <Scribble
                setUnsaved={setUnsaved}
                setNavTitle={setNavTitle}
                settings={settings}
              />
            }
          />
          {user && (
            <Route
              path="/account"
              element={
                <Account settings={settings} setNavTitle={setNavTitle} />
              }
            />
          )}
          {user && (
            <Route
              path="/settings"
              element={
                <Settings
                  settings={settings}
                  setSettings={setSettings}
                  setNavTitle={setNavTitle}
                />
              }
            />
          )}
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
