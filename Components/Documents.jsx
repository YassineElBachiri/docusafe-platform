// import { setGlobalState, useGlobalState } from "../store";

const imgHero = 'https://blog.1password.com/posts/2021/how-to-hand-over-cryptocurrency/header.png';

const Documents = () => {
    const [bdts] = useGlobalState("bdts")
    return (
        <div className="bg-[#151c25] gradient-bg-documents">
            <div className="w-4/5 py-10 mx-auto">
                <h4 className="text-white text-3xl font-bold uppercase text-gradient">Latest Documents</h4>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3">
                    {bdts.map((bdt, i) => (
                        <Card key={i} bdt={bdt} />
                    ))}
                </div>
            </div>
        </div>
    )
}

const Card = ({ bdt }) => (
    <div className="w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-4 p-3">
        <img className="h-60 w-full object-cover shadow-lg shadow-black rounded-lg mb-3" src={bdt.metadataURI} alt={bdt.title} />
        <h4 className="text-white font-semibold">{bdt.title}</h4>
        <p className="text-gray-400 text-sm my-1">{bdt.description}</p>
        <div className="flex justify-between items-center mt-3 text-white">
            <div className="flex flex-col">
                <small className="text-xs">price</small>
                <p className="text-sm font-semibold">{bdt.cost} ETH</p>
            </div>

            <button className="shadow-lg shadow-black text-sm bg-[#1D98DF] hover:bg-[#33cce0] rounded-full px-1.5 py-1"
                
            >View Details</button>
        </div>
    </div>
)

