import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Header from './components/Header';
import Samurais from './pages/Samurais';
import { AuthProvider } from './contexts/AuthContext';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/samurais" element={<Samurais />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
