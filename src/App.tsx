import { useContext } from 'react'
import { TwitContext } from './context/twitContext';
import {Routes, Route} from "react-router-dom";
import {Navbar, Login, Register} from "./components";
import {Home, Monitoring, Settings} from "./pages";
import './App.css'

function App() {
  const {twitText} = useContext(TwitContext)
  // twitText();
  return (
    <div className="App">
      <Navbar/>
      <Login/>
      <Register/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/monitoring' element={<Monitoring/>}/>
        <Route path='/settings' element={<Settings/>}/>
      </Routes>
    </div>
  )
}

export default App
