import './App.css'
import { TaskProvider } from './context/TaskContext'
import HomePage from './pages/HomePage'

function App() {

  return (
    <>
      <TaskProvider>
        <HomePage />
      </TaskProvider>
    </>
  )
}

export default App
