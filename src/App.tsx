import { BrowserRouter as Router, Routes } from "react-router-dom";
import AppRoutes from "./routes/route";
import AuthProvider from "./validate/AuthContext";

const App = () => {
  return (
    <Router>
    <AuthProvider>
        <AppRoutes />
    </AuthProvider>
    </Router>
  );
};

export default App;
