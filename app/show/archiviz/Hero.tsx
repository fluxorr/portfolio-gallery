import BGImage from "./assets/bg.png"
import Button from "./Button"

const Hero = () => {
    return (
        <div
            style={{
                backgroundImage: `
                    radial-gradient(circle at center, rgba(0,0,0,0.38) 25%, rgba(0,0,0,0.85) 100%),
                    url('${BGImage.src}')
                `,
            }}
            className="w-full h-screen bg-cover bg-center -z-10"
        >
            <div className="flex justify-center items-center h-screen text-center flex-col px-4 sm:px-6 lg:px-0">
                <p className="font-noto-serif-display text-4xl sm:text-5xl lg:text-7xl tracking-tight leading-tight">
                    Bring your visions <br />
                    to life
                </p>
                <p className="max-w-sm sm:max-w-2xl lg:max-w-5xl text-balance py-6 lg:py-8 text-sm sm:text-base text-neutral-300/90">
                    Professional AI-powered architectural visualization. Generate photorealistic renders, synthesize complex materials, and master lighting in seconds.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                    <Button>Start Rendering Now</Button>
                    <Button variant={"secondary"}>View Showreel</Button>
                </div>
            </div>
        </div>
    )
}

export default Hero
