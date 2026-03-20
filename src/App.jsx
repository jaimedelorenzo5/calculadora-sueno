import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Recursos from './pages/Recursos';
import Privacidad from './pages/Privacidad';
import AvisoLegal from './pages/AvisoLegal';
import Cookies from './pages/Cookies';
import Contacto from './pages/Contacto';
import CookieBanner from './components/CookieBanner';
import './styles/app.css';

function App() {
  return (
    <>
      <CookieBanner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/recursos" element={<Recursos />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </>
  );
}

export default App;
