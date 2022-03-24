
// import logo from './logo.svg';
import './App.scss';
import { Link, Routes, Route } from 'react-router-dom'

//Components
import Translation from './components/Translation/Translation';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Translation />}/>
        <Route path="*" element={<Translation />} />
      </Routes>
    </div>
  );
}

export default App;
