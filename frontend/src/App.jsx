import './App.css'
import axios from 'axios';
import Sidebar from './components/Sidebar';


function App() {

  return (
    <div className="w-[100vw] min-h-[100vh] h-fit bg-gray-900 flex items-center">
      <Sidebar />
      <content className="flex-1"></content>
    </div>
  )
}

export default App