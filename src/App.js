import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Quran from "./pages/Quran";
import Hadith from "./pages/Hadith";
import Contact from "./pages/Contact";
import Fourohfour from "./pages/404";

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="quran" element={<Quran />} />
          <Route path="hadith" element={<Hadith />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Fourohfour />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;