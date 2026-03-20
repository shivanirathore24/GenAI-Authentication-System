import { Link } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="container mt-5">
      <nav className="mb-4">
        <Link to="/" className="me-3">
          Home
        </Link>
        <Link to="/login" className="me-3">
          Login
        </Link>
        <Link to="/signup">Signup</Link>
      </nav>

      <AppRoutes />
    </div>
  );
}

export default App;
