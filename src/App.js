import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './components/Layout/Layout';
import Home from "./components/Home/Home";
import Category from './components/Category/Category';
import AddActivity from "./components/AddActivity/AddActivity";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="addActivities" element={<AddActivity />} />
          <Route path="category/:category_type" element={<Category />} />
        </Route>
      </Routes>
    </BrowserRouter>    
  );
}

export default App;
