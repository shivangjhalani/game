import Hero from './components/Hero/Hero'

function App() {
  return (
    <div className="overflow-hidden w-full relative">
      <main>
        <section className="h-screen relative">
          <Hero />
        </section>
        <div className="h-[200vh]">
          {/* Your other content goes here */}
        </div>
      </main>
    </div>
  )
}

export default App