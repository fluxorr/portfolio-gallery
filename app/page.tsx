import Link from "next/link"

const Links = [
  {
    name: "Relia", href: "/show/relia"
  },
  {
    name: "Patakha", href: "/show/patakha"
  }, {
    name: "Stack Cards", href: "/show/stack-cards"
  },
  {
    name: "Interactive Mail", href: '/show/interactive-mail'
  },
  {
    name: "Cards", href: '/show/cards'
  }
]

const Home = () => {
  return (

    <div className="flex justify-center items-center   h-screen selection:bg-white selection:text-black" >



      <div className="flex  flex-row " >
        <div className="text-5xl flex items-center p-8 -ml-64  leading-16 text-balance" >Fluxorr</div>

        <div className="h-[50vh] w-px bg-neutral-400/40 " ></div>
        <div className="p-4 text-xl font-mono " >
          {Links.map((link, idx) => (
            <div key={idx} className="mb-2">
              <Link href={link.href} className="hover:underline">
                {link.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
