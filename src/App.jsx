import { Routes, Route } from 'react-router-dom'
import Hero from './components/Hero/Hero'
import GradientSection from './components/GradientSection/GradientSection'
import Navbar from './components/Navbar/Navbar'
import About from './pages/About'
import Team from './pages/Team'
import Events from './pages/Events'

function App() {
  return (
    <div className="overflow-hidden w-full relative">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <main className="relative">
            <section className="relative z-10">
              <Hero />
            </section>
            <section className="relative z-20 -mt-32">
              <GradientSection />
            </section>
            <div className="relative z-30 bg-black h-[200vh]">
              {/* Your next section content */}
            </div>
          </main>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </div>
  )
}

export default App