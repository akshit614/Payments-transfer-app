import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import InputBox from "../components/InputBox"
import Button from "../components/Button"

import axios from "axios"
import { AxiosClient } from "../utils/axios";

const Users = () => {

  const [users,setUsers] = useState([])
  const [filter,setFilter] = useState("")

  useEffect(() => {
    AxiosClient.get("/users/?filter="+filter).then(res => {
      setUsers(res.data.user)
    })

  },[filter])

  return (
    <div>
      <div className="pt-4">
      <div className="font-bold text-3xl">Users</div>
      <InputBox onChange={e => setFilter(e.target.value)} placeholder={"Sesrch users..."}/>
      <div>
        {users.map(item => <User key={item._id} user={item} />)}
      </div>

    </div>
    </div>
  )
}

function User({user}) {

  const navigate = useNavigate();

  return <div className="flex justify-between pt-2">
    <div className="flex">
      <div className="bg-gray-400 rounded-full h-11 w-11 flex justify-center mt-1 mr-2">
        <div className="flex flex-col justify-center h-full text-2xl">
          {user.firstname[0]}
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <div>
          {user.firstname} {user.lastname}
        </div>
      </div>
      </div>
      <div className="flex flex-col justify-center ">
        <Button label={"Pay Money"} onClick={(e) => {
          navigate("/transfer?id=" + user._id + "&name=" + user.firstname)
        }}/>
      </div>
  </div>
}


export default Users