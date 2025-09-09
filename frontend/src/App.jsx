import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import TaskDetails from '../pages/TaskDetails'
import AddTask from '../pages/AddTask'
import EditTask from '../pages/EditTask'
import NotFound from '../pages/NotFound'

import './App.css'

function App() {


  return (
   <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/task/:id" element={<TaskDetails />} />
      <Route path="/create" element={<AddTask />} />
      <Route path="/edit/:id" element={<EditTask />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
   </Router>
  )
}

export default App
