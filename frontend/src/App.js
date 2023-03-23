import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from './context/notes/NoteState';
import UserState from './context/users/UserState';
import AlertState from './context/alert/AlertState';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {

  return (
    <>
    <AlertState>
    <UserState>
      <NoteState>
        <Router>
          <Navbar />
          <div className='container'>
            <Routes >
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes >
          </div>
        </Router>
      </NoteState>
      </UserState>
      </AlertState>
    </>
  );
}

export default App;
