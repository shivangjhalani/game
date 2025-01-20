import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar/Navbar'
// import LoadingSpinner from './components/LoadingSpinner'
import { useSmoothScroll } from './hooks/useSmoothScroll'

// Lazy load all major components
const Hero = lazy(() => import('./components/Hero/Hero'))
const GradientSection = lazy(() => import('./components/GradientSection/GradientSection'))
const TracingBeam = lazy(() => import('./components/TracingBeams/TracingBeam'))
const About = lazy(() => import('./pages/About'))
const Team = lazy(() => import('./pages/Team'))
const Events = lazy(() => import('./pages/Events'))
const Showcase = lazy(() => import('./pages/Showcase'))
const FAQ = lazy(() => import('./components/FAQ/FAQ'))
const DotBackground = lazy(() => import('./components/DotBackground/DotBg'))
const ExpandableCards = lazy(() => import('./components/ExpandableCards/ExpandableCards'))
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
              <Suspense>
                <section className="z-10">
                  <Hero />
                </section>
                <section className="relative z-20 -mt-32">
                  <GradientSection />
                </section>
                <section>
                  <DotBackground>
                    <div className="relative">
                      <TracingBeam>
                        <div className="h-[150vh]">
                          <section className="py-14">
                            <FAQ />
                          </section>
                          <section className="py-14">
                            <ExpandableCards maxCards={2} showFeaturedOnly={true} />
                          </section>
                          </div>
                      </TracingBeam>
                    </div>
                    <div className="h-[150vh]" />
                  </DotBackground>
                </section>
              </Suspense>
            </main>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/events" element={<Events />} />
          <Route path="/showcase" element={<Showcase />} />
        </Routes>
      </Suspense>
    </main>
  )
}

export default App