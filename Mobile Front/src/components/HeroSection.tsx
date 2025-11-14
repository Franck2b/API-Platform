import Header from "./Header";
import SearchForm from "./SearchForm";

export default function HeroSection() {
  return (
    <section className="h-screen snap-start snap-always relative overflow-hidden">
      <div className="h-full flex flex-col">
        <div 
          className="relative bg-cover bg-top"
          style={{ 
            backgroundImage: "url('/header1.avif')",
            height: '55%'
          }}
        >
          <div className="relative z-10 h-full flex flex-col">
            <Header />

            <div className="text-center px-6 pt-10">
              <h1 className="text-white text-4xl font-bold mb-4 leading-tight drop-shadow-lg">
                Explore The World<br />Around You
              </h1>
              <p className="text-white text-sm leading-relaxed max-w-xs mx-auto drop-shadow">
                Take a break from the stress of everyday life,<br />
                plan trips and explore your favorite<br />
                destinations
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white relative">
          <div className="absolute left-0 right-0 px-6 -top-32">
            <SearchForm />
          </div>
        </div>
      </div>
    </section>
  );
}

