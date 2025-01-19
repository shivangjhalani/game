import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar/Navbar'
// import LoadingSpinner from './components/LoadingSpinner'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { TextHoverEffect } from './components/Hero/TextHoverHeading'

// Lazy load all major components
const Hero = lazy(() => import('./components/Hero/Hero'))
const GradientSection = lazy(() => import('./components/GradientSection/GradientSection'))
const TracingBeam = lazy(() => import('./components/TracingBeams/TracingBeam'))
const About = lazy(() => import('./pages/About'))
const Team = lazy(() => import('./pages/Team'))
const Events = lazy(() => import('./pages/Events'))
const Ellipses = lazy(() => import('./components/Hero/Ellipses'))

function App() {
  useSmoothScroll()
  
  return (
    <main>
      <Navbar />
      {/* <Suspense fallback={<TextHoverEffect />}> */}
      <Suspense>
        <Routes>
          <Route path="/" element={
            <main className="overflow-hidden">
              <Suspense fallback={<TextHoverEffect />}>
                <section className="z-10">
                  <Hero />
                </section>
                <section className="relative z-20 -mt-32">
                  <GradientSection />
                </section>
                <div className="relative">
                  <TracingBeam>
                    <div className="h-[150vh]" />
                  </TracingBeam>
                </div>
                <div className="h-[150vh]" />
              </Suspense>
            </main>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </Suspense>
    </main>
  )
}

export default App