import './App.css';
import User from './user/User'
import Admin from './admin/Admin'
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
      <div className="app">
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
  );
};

export default App;
