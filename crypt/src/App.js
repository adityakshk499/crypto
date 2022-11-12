import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./Components/Navbar";
import Trending from "./Components/Trending";
import { Routes, Route} from "react-router-dom";
import Top30 from "./Components/Top30";

const App = () => {
  return (
    <ThemeProvider>
      <Navbar />
<Routes>
  <Route  path="/" element={<Top30 />}/>
  <Route   path='trending' element={<Trending />}/>
</Routes>
      

      
    </ThemeProvider>
  );
};

export default App;
