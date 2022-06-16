import "./App.css";
import Scribble from "./pages/Scribble";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { useAuth } from "./utils/auth";

function App() {
  const auth = useAuth();

  useEffect(() => {
    auth.checkSignedIn();
  }, []);

  return (
    <div className="App">
      <Scribble />
      <Footer />
    </div>
  );
}

export default App;
