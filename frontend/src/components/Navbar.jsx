
const Navbar = ({ username }) => {
    
    return <div className="shadow-lg hover:shadow-indigo-500/60 h-20 flex justify-between rounded-full ">
        <div className="font-bold text-3xl flex flex-col justify-center h-full ml-4 p-5">
            PayWay
        </div >
        <div className="flex pr-2">
            <div className="flex font-bold flex-col justify-center h-full mr-4">
                Hello {username}!
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-4 mr-3">
                <div className="flex font-mono flex-col justify-center text-3xl">
                    {username[0]}
                </div>
            </div>
        </div>
    </div>
}

export default Navbar