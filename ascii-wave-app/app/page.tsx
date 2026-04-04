import AsciiWave from "@/components/AsciiWave";

export default function Home() {
  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* ASCII Wave Background */}
      <AsciiWave />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-left justify-center h-full px-4 ">
        <div className="max-w-5xl  space-y-6 ">
          <p className="   tracking-tighter leading-24 text-left font-light text-9xl  text-white drop-shadow-lg uppercase">
            {/* signal <br /> noise */}
          </p>
          {/* <p className="text-xl md:text-2xl text-gray-300 max-w-xs text-balance   mx-auto">
            Automated entropy reduction for enterprise data.
          </p> */}

        </div>
      </div>
    </div>
  );
}
