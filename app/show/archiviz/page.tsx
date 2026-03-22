import CardSection from "./CardSection"
import Hero from "./Hero"
import Navbar from "./Navbar"
import Testimonial from "./Testimonial"





const Archiviz = () => {


    return (
        <div className='bg-[#2d2014]/60 selection:bg-white selection:text-black'  >


            <Navbar />
            <Hero />
            <CardSection />

            <Testimonial />

        </div >
    )
}

export default Archiviz
