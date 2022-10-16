import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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
import { ToastContainer } from "react-toastify";

function App() {
  const [user, setUser] = useState(null);
  const [navTitle, setNavTitle] = useState("");
  const [settings, setSettings] = useState("");
  const [tempScribbles, setTempScribbles] = useState("");

  const auth = useAuth();

  useEffect(() => {
    if (!user) {
      auth.checkSignedIn();
      setUser(auth.user);
    }

    if (user) {
      // Check for user Settings
      let cachedSettings = localStorage.getItem("settings");
      console.log(typeof cachedSettings);
      if (cachedSettings !== "undefined") {
        console.log("Cached settings exist");
        cachedSettings = JSON.parse(localStorage.getItem("settings"));
      }

      if (cachedSettings) {
        console.log("Cached settings exist and is not undefined");
        setSettings(cachedSettings);
      } else {
        const getSettings = async () => {
          const settings = await getUserSettings(auth.user.uid);

          if (settings !== undefined) {
            setSettings(settings);
            localStorage.setItem("settings", JSON.stringify(settings));
          }
        };
        getSettings();
      }
    }
  }, [auth, setUser, user]);

  useEffect(() => {
    setNavTitle("");
  }, [setNavTitle]);

  return (
    <div className="App">
      <Router>
        <Navbar
          navTitle={navTitle}
          setNavTitle={setNavTitle}
          tempScribbles={tempScribbles}
        />
        <GlobalStyle />
        <Routes>
          <Route
            path="/"
            element={
              <Scribble
                setNavTitle={setNavTitle}
                settings={settings}
                setSettings={setSettings}
                setTempScribbles={setTempScribbles}
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
      <ToastContainer closeButton={false} />
    </div>
  );
}

export default App;
