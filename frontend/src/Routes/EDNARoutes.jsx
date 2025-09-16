
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Overview from '../Dashboard/components/Overview/Overview'

const EDNARoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Overview/>}/>
        </Routes>
      
    </div>
  )
}

export default EDNARoutes
