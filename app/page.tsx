import Link from "next/link"


const Links = [
  {
    name: "Relia", href: "/show/relia"
  },
  {
    name: "{}", href: "/show/"
  }
]

const Home = () => {
  return (
    <div className="flex justify-center items-center font-mono  h-screen selection:bg-white selection:text-black" >
      <div className="flex  flex-row " >
        <div className="text-5xl flex items-center p-8 -ml-64 font-hachi leading-16 text-balance" >ラフル <br /> チャウダリ</div>

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
