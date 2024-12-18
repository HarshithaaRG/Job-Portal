import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/ui/shared/Navbar'

const AppRouter=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/',
    element:<Home/>
  }

])

function App() {
  

  return (
    <>
      
      <Navbar/>
    </>
  )
}

export default App
