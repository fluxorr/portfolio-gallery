import Image from "next/image"
import ImageOne from "./assets/Image1.png"
import ImageTwo from "./assets/Image2.png"
import { Check } from "lucide-react"



const CardOne = () => {
    return (
        <div className="py-32 flex flex-row justify-center items-center w-full">
            <div className="flex justify-center items-center w-137.5 border p-3 border-neutral-400/20 rounded-2xl ">
                <Image src={ImageOne.src} height={550} width={550} alt="Photorealism" />
            </div>
            <div className="flex flex-col justify-center items-start max-w-lg ml-12">
                <p className="uppercase font-manrope text-xs font-semibold text-neutral-500 tracking-wider" > Unmatched Quality </p>
                <p className="text-[40px]  py-2 font-pt-serif " >Photorealistic Rendering</p>
                <p className="text-balanc text-neutral-500 mb-4" > Our advanced AI engine interprets CAD data and hand sketches to produce stunning, high-fidelity visualizations. Achieve cinema-quality lighting and depth that captures every detail of your architectural design. </p>
                <p className="flex flex-row gap-2 text-neutral-500 items-center py-2 text-xs" ><Check className="text-white" size={16} />
                    8K Resolution Output
                </p>
                <p className="flex flex-row gap-2 text-neutral-500 items-center text-xs" ><Check className="text-white" size={16} />
                    Automated Post-Processing
                </p>
            </div>
        </div>
    )
}





const CardTwo = () => {
    return (
        <div className="py-32 flex flex-row justify-center items-center w-full">

            <div className="flex flex-col justify-center items-start max-w-lg px-4 ml-12">
                <p className="uppercase font-manrope text-xs font-semibold text-neutral-500 tracking-wider" > Unmatched Quality </p>
                <p className="text-[40px]  py-2 font-pt-serif " >Photorealistic Rendering</p>
                <p className="text-balanc text-neutral-500 mb-4" > Our advanced AI engine interprets CAD data and hand sketches to produce stunning, high-fidelity visualizations. Achieve cinema-quality lighting and depth that captures every detail of your architectural design. </p>
                <p className="flex flex-row gap-2 text-neutral-500 items-center py-2 text-xs" ><Check className="text-white" size={16} />
                    8K Resolution Output
                </p>
                <p className="flex flex-row gap-2 text-neutral-500 items-center text-xs" ><Check className="text-white" size={16} />
                    Automated Post-Processing
                </p>
            </div>
            <div className="flex justify-center items-center w-137.5 border p-3 border-neutral-400/20 rounded-2xl ">
                <Image src={ImageTwo.src} height={550} width={550} alt="Material Synthesis" />
            </div>

        </div>
    )
}




const CardSection = () => {
    return (
        <div className="bg-neutral-950 " >
            <CardOne />
            <div className="w-full h-px bg-neutral-400/10" />
            <CardTwo />
        </div>
    )
}

export default CardSection
