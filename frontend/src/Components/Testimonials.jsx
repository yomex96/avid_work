import { useRef, useState, useEffect } from 'react';
import { moonOvalay, testimonials } from '../assets/assets.js';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedUnderline from './AnimatedUnderline.jsx';

const testimonialsData = [
  { name: 'James Pattinson', rating: 4, text: '"We couldn’t be happier with the photos! Every moment was captured beautifully, and the whole experience was seamless."' },
  { name: 'Jane Smith', rating: 5, text: '"The attention to detail and creativity were beyond our expectations. They made us feel comfortable and the photos turned out amazing!"' },
  { name: 'James Pattinson', rating: 3, text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est deleniti ea corporis rem at. Ex iure nihil ratione.' },
  { name: 'Sophia Martinez', rating: 5, text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est deleniti ea corporis rem at. Ex iure nihil ratione.' },
  { name: 'James Pattinson', rating: 4, text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est deleniti ea corporis rem at. Ex iure nihil ratione.' },
  { name: 'Michael Brown', rating: 2, text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est deleniti ea corporis rem at. Ex iure nihil ratione.' },
  { name: 'James Pattinson', rating: 5, text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est deleniti ea corporis rem at. Ex iure nihil ratione.' },
  { name: 'Daniel Wilson', rating: 4, text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est deleniti ea corporis rem at. Ex iure nihil ratione.' },
  { name: 'James Pattinson', rating: 5, text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est deleniti ea corporis rem at. Ex iure nihil ratione.' }
];

const TestimonialsComponent = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [scrollSteps, setScrollSteps] = useState(0);
  const [currentScrollIndex, setCurrentScrollIndex] = useState(0);

  // Scroll left function
  const scrollLeft = () => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 640 ? -355 : -1200;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Scroll right function
  const scrollRight = () => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 640 ? 355 : 1200;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Check scroll position and update indicators
  const handleScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth);

    const newIndex = Math.round(scrollLeft / clientWidth);
    setCurrentScrollIndex(newIndex);
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    // Calculate total scroll steps accurately
    const calculateScrollSteps = () => {
      const { scrollWidth, clientWidth } = scrollContainer;
      setScrollSteps(Math.floor(scrollWidth / clientWidth));
    };

    calculateScrollSteps();
    scrollContainer.addEventListener('scroll', handleScroll);

    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to generate star rating dynamically
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < rating ? '★' : '☆');
    }
    return stars.join('');
  };

  return (
    <>
      <div className="relative w-full sm:w-[1200px] mx-auto h-[620px] overflow-hidden px-4 py-20">
        <div className='flex flex-col justify-center items-center'>
         <AnimatedUnderline>
         <h2 className='font-bold text-3xl'>Testimonials</h2>
         </AnimatedUnderline>
          <p className='mt-2 mb-6 text-gray-500'>What our customers say</p>
        </div>

        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            className="absolute left-0 top-80 md:top-96 transform -translate-y-1/2 z-10 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 focus:outline-none"
            onClick={scrollLeft}
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            className="absolute right-0 top-80 md:top-96 transform -translate-y-1/2 z-10 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 focus:outline-none"
            onClick={scrollRight}
          >
            <ChevronRight size={32} />
          </button>
        )}

        {/* Testimonials Container */}
        <div
        ref={scrollRef}
        className="flex overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide space-x-4"
      >
        {Object.values(testimonials).map((image, index) => (
          <div
            key={index}
            className="h-[335px] sm:h-[451px] w-[343px] sm:w-[384px] flex-shrink-0 flex flex-col items-center p-4 bg-black text-white shadow-md rounded-md relative"
          >
            {/* Image and Moon Overlay Container */}
            <div className="image-container relative z-0">
              {/* Moon Overlay */}
              <img
                src={moonOvalay.moon}
                alt="Moon Overlay"
                className="absolute top-10 left-1/2 transform -translate-x-1/2 py-10 z-0 scale-[200%] filter brightness-[20%]"
              />

              {/* Profile Image */}
              <img
                src={image}
                alt={`testimonial-${index}`}
                className="h-20 w-20 sm:h-40 sm:w-40 rounded-full object-cover z-10 relative"
              />
            </div>

            {/* Name */}
            <h2 className="md:mt-4 text-avidBrown text-lg font-bold z-20 relative">
              {testimonialsData[index]?.name || 'Anonymous'}
            </h2>

            {/* Star Rating */}
            <div className="md:mt-4 text-yellow-500 z-20 relative">
              {renderStars(testimonialsData[index]?.rating || 0)}
            </div>

            {/* Paragraph */}
            <p className="md:mt-9 text-center text-gray-600 z-20 relative">
              {testimonialsData[index]?.text || 'No review provided.'}
            </p>
          </div>
        ))}
      </div>
      </div>

      {/* Scroll Indicator Below the Container */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        {Array.from({ length: scrollSteps }).map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentScrollIndex ? 'bg-black w-6 h-3 rounded-md' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </>
  );
};

export default TestimonialsComponent;
