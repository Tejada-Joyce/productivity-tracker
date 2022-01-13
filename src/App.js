import './App.css';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './components/Layout/Layout';
import Home from "./components/Home/Home";
import AddActivity from "./components/AddActivity/AddActivity";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="addActivities" element={<AddActivity />} />
        </Route>
      </Routes>
    </BrowserRouter>    
  );
}

export default App;
