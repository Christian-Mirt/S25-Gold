import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import SignUp from './components/SignUp/SignUp'
import Header from './shared/Header/Header';
import SearchFilter from './components/SearchFilter/SearchFilter'
import Places from './components/Places/Places'
import Profile from './components/Profile/Profile';
import SignIn from './components/SignIn/SignIn';
import Reset from './components/Reset/Reset';
import PhotoUpload from './components/PhotoUpload/PhotoUpload';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/searchfilter" element={<SearchFilter />} />
        <Route path="/places" element={<Places />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profile/" element={<Profile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/upload" element={<PhotoUpload />} />
      </Routes>
    </Router>
  );
}

export default App;
