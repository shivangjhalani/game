import Hero from './components/Hero/Hero'
import GradientSection from './components/GradientSection/GradientSection'

function App() {
  return (
    <div className="overflow-hidden w-full relative">
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
    </div>
  )
}

export default App