import gradientVideo from '../assets/gradient-sound.mp4';
import { useRef, useEffect } from 'react';

export default function Homepage() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const handleEnd = () => {
      video.pause();
    };

    video.addEventListener('ended', handleEnd);
    return () => {
      video.removeEventListener('ended', handleEnd);
    };
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <section className="relative grow flex items-center justify-center px-6 py-24 md:py-32 overflow-hidden">
        {/* Background Video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={gradientVideo} type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10 md:space-y-14">
          <h1 className="sm:text-2xl md:text-4xl lg:text-6xl font-serif font-medium leading-tight tracking-wide text-gray-100">
            <span className="block">"Every blank page is an invitation.</span>
            <span className="block mt-4 md:mt-6 text-gray-400">
              Let your ideas breathe,
            </span>
            <span className="block">words flow, and your stories find</span>
            <span className="block mt-2 md:mt-4 text-gray-400">
              their shape."
            </span>
          </h1>

          <p className="sm:text-lg md:text-2xl text-gray-400 font-extralight max-w-4xl mx-auto leading-relaxed">
            Dream it. Draft it. Publish it — with an AI companion that refines
            every sentence and makes your voice shine.
          </p>

          <div className="pt-6 md:pt-10">
            <button className="inline-block px-10 py-5 text-lg md:text-xl font-light text-white border-2 border-gray-400 transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98]">
              OPEN THE EDITOR →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
