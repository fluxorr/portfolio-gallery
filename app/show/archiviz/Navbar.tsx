import Button from "./Button"

const Logo = () => {
    return (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="16" fill="white" />
            <rect x="16" y="4.68628" width="16" height="16" transform="rotate(45 16 4.68628)" fill="#0A0A0A" />
        </svg>
    )
}

const Navbar = () => {
    return (
        <nav className="bg-neutral-400/20 backdrop-blur-sm sticky top-0 z-20">
            <div className="flex items-center justify-between mx-auto max-w-[92vw] lg:max-w-[80vw] py-3 lg:py-4">
                <div className="flex flex-row items-center gap-2 text-base lg:text-lg font-semibold">
                    <Logo />
                    <p>Archiviz</p>
                </div>

                <div className="hidden lg:flex flex-row gap-8 text-sm text-neutral-400">
                    <p className="cursor-pointer hover:text-neutral-200">Features</p>
                    <p className="cursor-pointer hover:text-neutral-200">Testimonials</p>
                    <p className="cursor-pointer hover:text-neutral-200">Pricing</p>
                </div>

                <div className="flex flex-row items-center gap-3 sm:gap-5 lg:gap-8">
                    <button className="hidden sm:block cursor-pointer tracking-tighter font-extralight">Log In</button>
                    <Button>Try Free</Button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
