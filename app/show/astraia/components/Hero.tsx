

const Hero = () => {
    return (

        <div className='flex flex-col  justify-center items-center mx-auto h-screen  ' >

            <div className='flex flex-col items-start' >
                <p className='uppercase leading-26 text-9xl mb-6   max-w-3xl text-neutral-100\' >Astraia <br /> protocol</p>

                <p className='text-balance max-w-xl text-2xl  text-neutral-300' >Decentralized cryptographic security architecture.
                    Transforming digital chaos into trust-based systems.</p>
                <button className='my-8 cursor-pointer flex items-center justify-center gap-2 group bg-white text-black px-4 py-2 text-sm '>
                    EXPLORE PROTOCOL
                    <div className='transition-transform duration-200 group-hover:translate-x-1'>&rarr;</div>
                </button>
            </div>
        </div>

    )
}

export default Hero
