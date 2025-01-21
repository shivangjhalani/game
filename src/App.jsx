import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar/NewNavbar'
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
const Footer = lazy(() => import('./components/Footer/Footer'))
const ScrollToTop = lazy(() => import('./components/ScrollToTop'))

function App() {
  useSmoothScroll()
  
  return (
    <main>
      <ScrollToTop />
      <Navbar/>
      {/* <Suspense fallback={<TextHoverEffect />}> */}
      <Suspense>
        <Routes>
          <Route path="/" element={
            <main className="overflow-hidden">
              <Suspense>
                <section className="z-10 mt-16 md:mt-10">
                  <Hero />
                  <GradientSection />
                </section>
                <section>
                  <DotBackground>
                  <TracingBeam>
                    <div className="relative">
                          <div className="h-[150vh]">
                            <section className="py-14 px-6 md:px-8">
                              <ExpandableCards maxCards={2} showFeaturedOnly={true} />
                            </section>
                            <section className="py-14 px-6 md:px-8">
                              <FAQ />
                            </section>
                            </div>
                      </div>
                    {/* <div className="h-[150vh]" /> */}
                    </TracingBeam>
                    <Footer />
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