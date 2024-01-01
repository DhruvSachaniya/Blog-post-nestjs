import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from './components/Home/Register';
import LoginPage from './components/Home/Login';
import PostMainPage from './components/Home/post/PostHome';
import AllPostPage from './components/Home/post/Allpost';
import YourPostPage from './components/Home/post/yourpost';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/Register' element={<RegisterPage />} />
          <Route path='/blog' element={<PostMainPage/>} />
          <Route path='/Allblog' element={<AllPostPage/>} />
          <Route path='/Yourblog' element={<YourPostPage/>} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        />
    </>
  );
}

export default App;
