import React from 'react'
import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Main from './components/Main';
import Informacion from './components/Informacion'
import Uniformidad from './components/tipos de pruebas/Uniformidad';
import Independencia from './components/tipos de pruebas/Independencia';
import Promedios from './components/pruebas de uniformidad/Promedios';
import Frecuencia from './components/pruebas de uniformidad/Frecuencia';
import Kolmogorov from './components/pruebas de uniformidad/Kolmogorov';
import Series from './components/pruebas de independencia/Series';
import Poker from './components/pruebas de independencia/Poker';
import Huecos from './components/pruebas de independencia/Huecos';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Informacion informacion="un tipo de prueba"/>} />
          <Route path="uniformidad" element={<Uniformidad />} >
            <Route index element={<Informacion informacion="una prueba de uniformidad"/>} />
            <Route path="promedios" element={<Promedios />} />
            <Route path="frecuencia" element={<Frecuencia />} />
            <Route path="kolmogorov-smirnov" element={<Kolmogorov />} />
          </Route>
          <Route path="independencia" element={<Independencia />}>
            <Route index element={<Informacion informacion="una prueba de independencia"/>} />
            <Route path="series" element={<Series />} />
            <Route path="poker" element={<Poker />} />
            <Route path="huecos" element={<Huecos />} />
          </Route>
          <Route path="*" element={<Informacion informacion="un tipo de prueba"/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


