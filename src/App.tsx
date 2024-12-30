import router from '@/routes/Routes';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { TaskProvider } from './context/TaskContext';

function App() {

  return (
    <>
      <TaskProvider>
        <RouterProvider router={router} />
      </TaskProvider>
    </>
  )
}

export default App
