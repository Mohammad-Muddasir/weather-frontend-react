import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherApp from "./weather";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherApp />} />
        <Route path="/weather" element={<WeatherApp />} />
      </Routes>
    </Router>
  );
}

export default App;
