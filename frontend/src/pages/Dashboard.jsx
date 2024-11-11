import { useEffect, useState } from "react"
import Navbar  from "../components/Navbar"
import ShowBalance  from "../components/ShowBalance"
import Users  from "../components/Users"
import { AxiosClient } from "../utils/axios"

const Dashboard = () => {

    const [balance, setBalance] = useState("10,000")
    const [username, setUsername] = useState("")

    const USER_TOKEN = localStorage.getItem("token")
    const AuthStr = 'Bearer '.concat(USER_TOKEN);

    const fetchBalance = async() => {
        const res = await AxiosClient.get("account/balance",{
            headers : {
                Authorization : AuthStr
            }
        })
        setBalance(res.data.balance)
    }
    
    const fetchName = async() => {
        const res = await AxiosClient.get("/users")
        const users = res.data.user
        // console.log(users[users.length - 1].firstname)
        const name = users[users.length - 1].firstname
        setUsername(name)
    }
    
    useEffect(()=>{
        fetchBalance()
        fetchName()
    },[])

    return <div className="px-10 py-5">
        <Navbar username={username} />
        <div className="m-10">
            <ShowBalance value={balance} />
            <Users />
        </div>
    </div>
}

export default Dashboard