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
            About Us – Inkforge AI
          </h1>

          <p className="lg:text-2xl md:text-1xl text-white font-extralight max-w-4xl mx-auto leading-relaxed">
            Welcome to Inkforge AI — where boring blogs meet their end, and
            compelling content creation becomes effortless, creative, and
            actually enjoyable.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6 md:px-12 lg:px-15 max-w-5xl mx-auto">
        <div className="prose prose-invert prose-lg md:prose-xl max-w-none">
          {/* Mission */}
          <h2 className="text-4xl md:text-5xl font-bold mt-16 mb-8 text-white">
            Our Mission
          </h2>
          <p className="text-gray-300 leading-relaxed mb-10">
            To empower anyone — from solo bloggers and small business owners to
            content agencies and enterprises — to produce high-quality, vibrant,
            human-like articles and blog posts without the usual drudgery. We
            don't just generate text; we help forge ideas into content that
            stands out, captivates audiences, and drives real results.
          </p>
          {/* Differentiators */}{" "}
          <h2 className="text-4xl md:text-5xl font-bold mt-20 mb-10 text-white">
            What Makes Inkforge AI Different?
          </h2>
          <p className="text-gray-300 mb-10">
            Inkforge AI isn't another generic "type prompt → get article" tool.
            We've built it with thoughtful features that address real pain
            points in the content creation workflow:
          </p>
          {/* Who We Are */}
          <h2 className="text-4xl md:text-5xl font-bold mt-24 mb-8 text-white">
            Who We Are
          </h2>
          <p className="text-gray-300 leading-relaxed mb-10">
            At the heart of Inkforge AI is Surjan, an independent creator and
            builder who experienced these exact struggles firsthand while
            growing projects, writing content, and helping others do the same.
            What started as a personal tool to make blogging faster and more fun
            evolved into a full-fledged product designed for real users like you
            — people who want quality without sacrificing speed or sanity.
          </p>
          <p className="text-gray-300 leading-relaxed mb-10">
            We're still growing, iterating, and listening closely to our early
            users. Every feature is shaped by real feedback from creators who
            refuse to settle for mediocre AI content.
          </p>
          {/* Promise & CTA */}
          <h2 className="text-4xl md:text-5xl font-bold mt-20 mb-8 text-white">
            Our Promise
          </h2>
          <p className="text-gray-300 leading-relaxed text-xl mb-12">
            With Inkforge AI, you'll spend less time wrestling with words and
            more time building your audience, business, or personal brand. We'll
            handle the heavy lifting so your ideas can shine — in full color,
            with strength, personality, and zero boredom.
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
