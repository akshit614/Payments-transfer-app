
const Navbar = ({ username }) => {
    
    return <div className="shadow h-14 flex justify-between">
        <div className="font-bold text-3xl flex flex-col justify-center h-full ml-4">
            PayWay
        </div >
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello {username}!
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-3">
                <div className="flex flex-col justify-center h-full text-3xl">
                    {username[0]}
                </div>
            </div>
        </div>
    </div>
}

export default Navbar