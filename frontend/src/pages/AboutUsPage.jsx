import my_photo from "../assets/my_photo.jpg";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen  text-gray-200">
      <Link to="/">
        <ArrowLeft
          className="text-white sticky top-0 left-0 ms-12 mt-5"
          size={40}
        />
      </Link>
      {/* Hero Section with Image */}
      <section className="relative py-16 md:py-24 px-4 md:px-12 lg:px-16 bg-linear-to-b from-black to-gray-950">
        <div className="max-w-6xl mx-auto text-center">
          {/* Your Photo - circular, centered, with subtle glow */}
          <div className="mb-10">
            <div className="inline-block relative">
              <img
                src={my_photo}
                alt="Surjan - Founder of Inkforge AI"
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover mx-auto"
              />
            </div>
          </div>

          {/* Main Headline - bright, bigger, eye-catching */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 text-white">
            About Us – EZ-write
          </h1>

          <p className="lg:text-2xl md:text-1xl text-white font-extralight max-w-4xl mx-auto leading-relaxed">
            Welcome to EZ-write — where boring blogs meet their end, and
            compelling content creation becomes effortless, creative, and
            actually enjoyable.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6 md:px-12 lg:px-15 max-w-5xl mx-auto">
        <div className="prose prose-invert prose-lg md:prose-xl max-w-none">
          {/* Promise & CTA */}
          <h2 className="text-4xl md:text-5xl font-bold mt-20 mb-8 text-white">
            Our Promise
          </h2>
          <p className="text-gray-300 leading-relaxed text-xl mb-12">
            With EZ-write, you'll spend less time wrestling with words and
            easily start writing any type of blog or article without burrying
            about the sentense structure. just a simple idea and start writing
            it.
          </p>
          <div className="text-center mt-16">
            <p className="text-xl italic text-gray-300">
              Built with ❤️ by Surjan. AI that understands your thoughts,
              adjustments, creativity.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
