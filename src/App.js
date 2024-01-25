
import './App.css';
import Homepage from './Pages/Home/Homepage';
import { Routes,Route } from 'react-router-dom';
import Todopage from './Pages/Todo/Todopage';
function App() {
  return (
    <div className="App">
  <Routes>
    <Route path='' element={<Homepage/>}/>
    <Route path='/todo' element={<Todopage/>}/>
  </Routes>
    </div>
  );
}

export default App;
