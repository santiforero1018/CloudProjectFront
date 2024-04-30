import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Supplier from './components/Supplier';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/supplier" element={<Supplier />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
