import React, { useState, useEffect } from 'react';

const AnimatedUnderline = ({ 
  children, 
  className = '', 
  underlineColor = '#A9785D', 
  duration = 9
}) => {
  const [animationKeyframes, setAnimationKeyframes] = useState('');

  useEffect(() => {
    // Generate complex random animation paths
    const generateRandomKeyframes = () => {
      // Randomize different animation scenarios
      const scenario = Math.floor(Math.random() * 5);

      switch(scenario) {
        case 0:
          // Starts before middle, goes to middle, then beyond
          return `
            @keyframes drawUnderline {
              0%, 10% { transform: scaleX(0); }
              20%, 35% { transform: scaleX(0.4); }
              45%, 60% { transform: scaleX(0.7); }
              70%, 85% { transform: scaleX(0.3); }
              95%, 100% { transform: scaleX(0); }
            }
          `;

        case 1:
          // Starts slow, jumps quickly, then varies
          return `
            @keyframes drawUnderline {
              0%, 15% { transform: scaleX(0); }
              25%, 40% { transform: scaleX(0.6); }
              50%, 65% { transform: scaleX(1.2); }
              75%, 90% { transform: scaleX(0.5); }
              95%, 100% { transform: scaleX(0); }
            }
          `;

        case 2:
          // Erratic movement with multiple stops
          return `
            @keyframes drawUnderline {
              0%, 10% { transform: scaleX(0); }
              20%, 30% { transform: scaleX(0.3); }
              40%, 50% { transform: scaleX(0.8); }
              60%, 70% { transform: scaleX(0.5); }
              80%, 90% { transform: scaleX(1.1); }
              95%, 100% { transform: scaleX(0); }
            }
          `;

        case 3:
          // Slow start, quick expansion, gradual retraction
          return `
            @keyframes drawUnderline {
              0%, 20% { transform: scaleX(0); }
              30%, 45% { transform: scaleX(0.2); }
              55%, 70% { transform: scaleX(1); }
              80%, 95% { transform: scaleX(0.4); }
              100% { transform: scaleX(0); }
            }
          `;

        default:
          // Most unpredictable - multiple quick changes
          return `
            @keyframes drawUnderline {
              0%, 15% { transform: scaleX(0); }
              25%, 35% { transform: scaleX(0.7); }
              45%, 55% { transform: scaleX(0.3); }
              65%, 75% { transform: scaleX(1.1); }
              85%, 95% { transform: scaleX(0.5); }
              100% { transform: scaleX(0); }
            }
          `;
      }
    };

    // Generate new keyframes
    setAnimationKeyframes(generateRandomKeyframes());
  }, [duration]);

  return (
    <div className="relative mb-4 inline-block">
      {children}
      <div 
        className={`absolute left-0 right-0 bottom-[-2px] h-0.5 ${className}`}
        style={{
          background: underlineColor,
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
          animation: `drawUnderline ${duration}s ease-in-out infinite`,
          height: '3px',
        }}
      />
      <style jsx>{animationKeyframes}</style>
    </div>
  );
};

export default AnimatedUnderline;








// import React, { useState, useEffect } from 'react';

// const AnimatedUnderline = ({ 
//   children, 
//   className = '', 
//   underlineColor = '#A9785D', 
//   duration = 9
// }) => {
//   const [animationKeyframes, setAnimationKeyframes] = useState('');

//   useEffect(() => {
//     // Generate random variations for each animation cycle
//     const generateRandomKeyframes = () => {
//       // Random starting point (between 10-20%)
//       const start = 10 + Math.floor(Math.random() * 10);
      
//       // Random mid-point variations (between 30-50%)
//       const midPoint1 = 30 + Math.floor(Math.random() * 20);
//       const midPoint2 = midPoint1 + 15;
      
//       // Random end point (between 80-90%)
//       const end = 80 + Math.floor(Math.random() * 10);

//       return `
//         @keyframes drawUnderline {
//           0%, ${start}% {
//             transform: scaleX(0);
//           }
//           ${midPoint1}%, ${midPoint2}% {
//             transform: scaleX(0.5);
//           }
//           ${end}%, 100% {
//             transform: scaleX(1);
//           }
//           100% {
//             transform: scaleX(0);
//           }
//         }
//       `;
//     };

//     // Generate new keyframes
//     setAnimationKeyframes(generateRandomKeyframes());
//   }, [duration]);

//   return (
//     <div className="relative inline-block">
//       {children}
//       <div 
//         className={`absolute left-0 right-0 bottom-[-2px] h-0.5 ${className}`}
//         style={{
//           background: underlineColor,
//           transformOrigin: 'left center',
//           transform: 'scaleX(0)',
//           animation: `drawUnderline ${duration}s ease-in-out infinite`
//         }}
//       />
//       <style jsx>{animationKeyframes}</style>
//     </div>
//   );
// };

// export default AnimatedUnderline;