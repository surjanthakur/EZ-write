import './App.css';
import MainAppLayout from './layouts/MainLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Homepage } from './pages/index';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainAppLayout />}>
            <Route path="/" element={<Homepage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
