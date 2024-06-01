import React from "react";
import Home from "./Components/Home";
import Edit from "./Components/Edit";
import ViewContact from "./Components/ViewContact";
import AddContact from "./Components/AddContact";
import DeleteContact from "./Components/DeleteContact";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/view/:id" element={<ViewContact />} />
        <Route path="add" element={<AddContact />} />
        <Route path="/delete/:id" element={<DeleteContact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
