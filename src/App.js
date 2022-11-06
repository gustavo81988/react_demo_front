import { Routes, Route } from "react-router-dom";
import SignUp from './scenes/auth/SignUp';
import SignIn from './scenes/auth/SignIn';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/sign_up" element={<SignUp />} />
    </Routes>
  );
};

export default App;