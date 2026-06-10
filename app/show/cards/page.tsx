import DitherShader from "@/components/shaders/DitherShader"
import { HugeiconsIcon } from '@hugeicons/react';
import { NeuralNetworkIcon } from '@hugeicons/core-free-icons';



export default function Page() {

    return (
        <div className="flex justify-center items-center h-screen" >
            <CardOne />
        </div>
    )
}


const CardOne = () => {
    return (
        <div className="w-92.5 h-142.5 flex flex-col rounded-xl bg-white p-4  ">
            <div className="h-[50%] pb-8 " >
                <DitherShader
                    className="rounded-lg pb-4"
                    gridSize={40}
                    scale={0.1}

                />

                <div className="h-px bg-neutral-300 /40" />
            </div>
            <div className="flex flex-col items-start justify-start gap-4" >
                <span className="pb-2 " >

                    <HugeiconsIcon size={38} icon={NeuralNetworkIcon} className="dark:text-neutral-900 text-neutral-900" />
                </span>
                <p className="text-5xl text-pretty tracking-tighter font-playfair text-neutral-900/90 pb-2"  >
                    Infrastructure For Thinking Machines.
                </p>
                <p className="  text-neutral-700/90 font-sans" >
                    Inference / Routing / Vector Search
                </p>
                <div className="h-px -mt  bg-neutral-300/40 w-full" />
            </div>

        </div>
    )
}