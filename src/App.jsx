import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Tabla from './components/TablaMaterials'
import Layout from './components/Layout'
import Tabs from './components/Tabs'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}/>
        <Route path='/materials' element={<Tabla/>}/>
        <Route path='/materials/:id' element={<Tabs/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
