import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Overview from '../Dashboard/components/Overview/Overview'
import Abundance from '../Dashboard/components/Aboundance/Abundance'
import DiversityAnalytics from '../Dashboard/components/DiversityAnalytics/DiversityAnalytics'
import NovelTaxa from '../Dashboard/components/NovelTaxa/NovelTaxa'
import TaxaExplorer from '../Dashboard/components/TaxaExplorer/TaxaExplorer'
import Chatbot from '../Dashboard/components/Chatbot/Chatbot'
import Settings from '../Dashboard/components/Settings/Settings'

const EDNARoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Overview/>}/>
        <Route path='/abundance' element={<Abundance/>}/>
        <Route path='/diversity' element={<DiversityAnalytics/>}/>
        <Route path='/novel-taxa' element={<NovelTaxa/>}/>
        <Route path='/taxa-explorer' element={<TaxaExplorer/>}/>
        <Route path='/chatbot' element={<Chatbot/>}/>
        <Route path='/settings' element={<Settings/>}/>
    </Routes>
  )
}

export default EDNARoutes