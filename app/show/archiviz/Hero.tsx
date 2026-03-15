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
            className=" w-full h-screen bg-cover bg-center -z-10 "
        >
            <div className="flex justify-center items-center h-screen text-center flex-col" >
                <p className="font-noto-serif-display text-7xl tracking-tight " >
                    Bring your visions <br />
                    to life
                </p>
                <p className="max-w-5xl text-balance py-8 text-neutral-300/90" > Professional AI-powered architectural visualization. Generate photorealistic renders, synthesize complex materials, and master lighting in seconds. </p>
                <div className="flex flex-row gap-4" >
                    <Button>Start Rendering Now</Button>
                    <Button variant={"secondary"} >View Showreel</Button>
                </div>
            </div>
        </div>
    )
}

export default Hero
