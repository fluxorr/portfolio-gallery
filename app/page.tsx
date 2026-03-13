import Link from "next/link"


const Links = [
  {
    name: "Relia", href: "/show/relia"
  },
  {
    name: "Archiviz", href: "/show/archiviz"
  }
]

const Home = () => {
  return (
    <div className="flex justify-center items-center font-mono  h-screen selection:bg-white selection:text-black" >
      <div className="flex  flex-row " >
        <div className="text-5xl flex items-center p-8 " >Hey there!</div>
        <div className="h-[50vh] w-px bg-neutral-400/40 " ></div>
        <div className="p-4 text-xl " >
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
