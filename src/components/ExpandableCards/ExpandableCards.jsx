"use client"
import Image from "@/components/Image"
import React, { useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useOutsideClick } from "@/hooks/useOutsideClick"
import { Link } from "react-router-dom"

function ExpandableCards({ maxCards, showFeaturedOnly = false }) {
  const [active, setActive] = useState(null)
  const id = useId()
  const ref = useRef(null)

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false)
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [active])

  useOutsideClick(ref, () => setActive(null))

  // Filter cards based on featured status if showFeaturedOnly is true
  const filteredCards = showFeaturedOnly 
    ? cards.filter(card => card.featured)
    : cards

  // Limit cards if maxCards is provided
  const displayedCards = maxCards 
    ? filteredCards.slice(0, maxCards)
    : filteredCards

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="max-w-xl mx-auto text-center">
        <h3 className="text-3xl font-spektra text-white/90 tracking-wide sm:text-4xl">
          {showFeaturedOnly ? "Featured Games" : "All Games"}
        </h3>
        <p className="text-white/70 mt-3">
          Explore our curated collection of iconic musicians and their timeless contributions to music.
        </p>
      </div>
      <div className="mt-12">
        <AnimatePresence>
          {active && typeof active === "object" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 h-full w-full z-10"
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {active && typeof active === "object" ? (
            <div className="fixed inset-0 grid place-items-center z-[100]">
              <motion.button
                key={`button-${active.title}-${id}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.05 },
                }}
                className="flex absolute top-4 right-4 lg:hidden items-center justify-center bg-neutral-900 border border-white/10 rounded-full h-8 w-8 hover:bg-neutral-800 transition-colors duration-200"
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-neutral-900 border border-white/10 sm:rounded-3xl overflow-hidden"
              >
                <motion.div layoutId={`image-${active.title}-${id}`}>
                  <Image
                    priority
                    width={200}
                    height={200}
                    src={active.src || "/placeholder.svg"}
                    alt={active.title}
                    className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                  />
                </motion.div>

                <div>
                  <div className="flex justify-between items-start p-4">
                    <div>
                      <motion.h3
                        layoutId={`title-${active.title}-${id}`}
                        className="font-spektra text-xl text-white/90 tracking-wide"
                      >
                        {active.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${active.description}-${id}`}
                        className="text-white/70 text-base"
                      >
                        {active.description}
                      </motion.p>
                    </div>

                    <motion.a
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      href={active.ctaLink}
                      target="_blank"
                      className="px-4 py-3 text-sm rounded-full font-bold bg-red-500/90 text-white hover:bg-red-500 transition-colors duration-200"
                      rel="noreferrer"
                    >
                      {active.ctaText}
                    </motion.a>
                  </div>
                  <div className="pt-4 relative px-4">
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-white/70 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                    >
                      {typeof active.content === "function" ? active.content() : active.content}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>
        <div className="flex flex-col items-center">
          <ul className="max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4 mb-8">
            {displayedCards.map((card) => (
              <motion.div
                layoutId={`card-${card.title}-${id}`}
                key={card.title}
                onClick={() => setActive(card)}
                className="p-4 flex flex-col hover:bg-neutral-800/50 rounded-xl cursor-pointer border border-white/10 transition-colors duration-200"
              >
                <div className="flex gap-4 flex-col w-full">
                  <motion.div layoutId={`image-${card.title}-${id}`}>
                    <Image
                      width={100}
                      height={100}
                      src={card.src || "/placeholder.svg"}
                      alt={card.title}
                      className="h-60 w-full rounded-lg object-cover object-top"
                    />
                  </motion.div>
                  <div className="flex justify-center items-center flex-col">
                    <motion.h3
                      layoutId={`title-${card.title}-${id}`}
                      className="font-spektra text-xl text-white/90 tracking-wide text-center md:text-left"
                    >
                      {card.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${card.description}-${id}`}
                      className="text-white/70 text-center md:text-left text-base"
                    >
                      {card.description}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </ul>

          {showFeaturedOnly && maxCards && filteredCards.length > maxCards && (
            <Link 
              to="/showcase"
              className="px-6 py-3 text-sm rounded-full font-bold bg-red-500/90 text-white hover:bg-red-500 transition-colors duration-200"
            >
              See More
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  )
}

const cards = [
  {
    description: "Lana Del Rey",
    title: "Summertime Sadness",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    featured: true,
    ctaText: "Visit",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Lana Del Rey, an iconic American singer-songwriter, is celebrated for her melancholic and cinematic music
          style. Born Elizabeth Woolridge Grant in New York City, she has captivated audiences worldwide with her
          haunting voice and introspective lyrics. <br /> <br /> Her songs often explore themes of tragic romance,
          glamour, and melancholia, drawing inspiration from both contemporary and vintage pop culture. With a career
          that has seen numerous critically acclaimed albums, Lana Del Rey has established herself as a unique and
          influential figure in the music industry, earning a dedicated fan base and numerous accolades.
        </p>
      )
    },
  },
  {
    description: "Babbu Maan",
    title: "Mitran Di Chhatri",
    src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
    featured: true,
    ctaText: "Visit",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Babu Maan, a legendary Punjabi singer, is renowned for his soulful voice and profound lyrics that resonate
          deeply with his audience. Born in the village of Khant Maanpur in Punjab, India, he has become a cultural icon
          in the Punjabi music industry. <br /> <br /> His songs often reflect the struggles and triumphs of everyday
          life, capturing the essence of Punjabi culture and traditions. With a career spanning over two decades, Babu
          Maan has released numerous hit albums and singles that have garnered him a massive fan following both in India
          and abroad.
        </p>
      )
    },
  },
  {
    description: "Metallica",
    title: "For Whom The Bell Tolls",
    src: "https://assets.aceternity.com/demos/metallica.jpeg",
    featured: true,
    ctaText: "Visit",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Metallica, an iconic American heavy metal band, is renowned for their powerful sound and intense performances
          that resonate deeply with their audience. Formed in Los Angeles, California, they have become a cultural icon
          in the heavy metal music industry. <br /> <br /> Their songs often reflect themes of aggression, social
          issues, and personal struggles, capturing the essence of the heavy metal genre. With a career spanning over
          four decades, Metallica has released numerous hit albums and singles that have garnered them a massive fan
          following both in the United States and abroad.
        </p>
      )
    },
  },
  {
    description: "Lord Himesh",
    title: "Aap Ka Suroor",
    src: "https://assets.aceternity.com/demos/aap-ka-suroor.jpeg",
    featured: true,
    ctaText: "Visit",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Himesh Reshammiya, a renowned Indian music composer, singer, and actor, is celebrated for his distinctive
          voice and innovative compositions. Born in Mumbai, India, he has become a prominent figure in the Bollywood
          music industry. <br /> <br /> His songs often feature a blend of contemporary and traditional Indian music,
          capturing the essence of modern Bollywood soundtracks. With a career spanning over two decades, Himesh
          Reshammiya has released numerous hit albums and singles that have garnered him a massive fan following both in
          India and abroad.
        </p>
      )
    },
  },
]

export default ExpandableCards

