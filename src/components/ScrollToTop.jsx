import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useSmoothScroll();

  useEffect(() => {
    // Use the Lenis instance to scroll to top
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return null;
} 