import { Routes, Route } from 'react-router-dom'
import Hero from './components/Hero/Hero'
import GradientSection from './components/GradientSection/GradientSection'
import Navbar from './components/Navbar/Navbar'
import About from './pages/About'
import Team from './pages/Team'
import Events from './pages/Events'
import TracingBeam from './components/TracingBeams/TracingBeam'
import { useSmoothScroll } from './hooks/useSmoothScroll'

function App() {
  useSmoothScroll()
  
  return (
    <main>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <main className="overflow-hidden">
            <section className="z-10">
              <Hero />
            </section>
            <section className="relative z-20 -mt-32">
              <GradientSection />
            </section>
            <div className="relative">
              <TracingBeam>
                <div className="h-[150vh]">
                </div>
              </TracingBeam>
            </div>
            <div className="h-[150vh]"></div>
          </main>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </main>
  )
}

export default App