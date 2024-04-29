import React from "react";
import 'react-toastify/dist/ReactToastify.css'; //toast
import { Routes, Route } from "react-router-dom";
import FormCreator from "./Pages/FormCreator/FormCreator";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<FormCreator />} />
    </Routes>
  );
};

export default App;
