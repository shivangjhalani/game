import { useState, useEffect } from 'react'

const Image = ({ src, alt, className, priority, ...props }) => {
  const [loading, setLoading] = useState(true)
  const [currentSrc, setCurrentSrc] = useState('')

  useEffect(() => {
    const img = new window.Image()
    img.src = src
    img.onload = () => {
      setCurrentSrc(src)
      setLoading(false)
    }
  }, [src])

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={`${className} ${loading ? 'blur-sm' : 'blur-0'} transition-all duration-300`}
      loading={priority ? "eager" : "lazy"}
      {...props}
    />
  )
}

export default Image 