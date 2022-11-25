import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Home, Login, NotFound, Profile } from "./pages";
import "./styles/index.scss";

function App() {
  const user = localStorage.getItem("user");
  return (
    <>
      <Router>
        {/* All pages rendered here */}
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to={"/login"} />}
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
