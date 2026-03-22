import Image from "next/image"

import User1 from "./assets/user1.png"
import User2 from "./assets/user2.png"
import User3 from "./assets/user3.png"

type TestimonialCardType = {
    avatar: string
    name: string
    designation: string
    description: string
}

const TestimonialCard = ({ avatar, name, designation, description }: TestimonialCardType) => {
    return (
        <div className="w-full {}bg-neutral-900/60 rounded-xl border border-neutral-800 text-balance p-5 sm:p-6 lg:p-8 transition-all hover:shadow-[0_0_20px_rgba(115,115,115,0.2)]">
            <div className="flex gap-2 items-center-safe">
                <Image src={avatar} alt="User Pic" height={50} width={50} className="rounded-full" />
                <div>
                    <p className="font-semibold font-manrope text-sm">{name}</p>
                    <p className="font-manrope tracking-wide text-neutral-500 text-xs pt-px">{designation}</p>
                </div>
            </div>{ }
            <p className="mt-4 italic{} text-neutral-500 text-sm pl-px text-balance">&quot;{description}&quot;</p>
        </div>
    )
}

const Testimonial = () => {
    return (
        <div className="flex justify-center items-center flex-col bg-neutral-950 px-4 sm:px-8 lg:px-64">
            <p className="text-3xl sm:text-4xl lg:text-5xl font-pt-serif mb-10 sm:mb-12 lg:mb-16 text-center">
                Trusted by leading studios
            </p>

            <div className="flex flex-col lg:flex-row gap-5 sm:gap-6 lg:gap-12 mb-16 sm:mb-24 lg:mb-32 w-full">
                <TestimonialCard
                    avatar={User1.src}
                    name="Julianne Devis"
                    designation="Lead Architect, Studio Verse"
                    description="Archiviz has completely transformed our workflow. We can now present photorealistic concepts to clients within hours instead of days."
                />
                <TestimonialCard
                    avatar={User2.src}
                    name="Marcus Kovic"
                    designation="3D Visualizer, Urban Flow"
                    description="The lighting engine is second to none. It understands atmospheric perspective in a way no other AI tool does."
                />
                <TestimonialCard
                    avatar={User3.src}
                    name="Sarah Linn"
                    designation="Principal, Linn & Partners"
                    description="Simple, intuitive, and incredibly powerful. The pricing tiers make it accessible for our small firm to produce world-class work."
                />
            </div>
        </div>
    )
}

export default Testimonial
