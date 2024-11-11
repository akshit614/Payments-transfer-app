import { useState } from "react"
import Button from "../components/Button"
import Header from "../components/Heading"
import InputBox from "../components/InputBox"
import SubHeading from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import BottomText from "../components/BottomText"
import { AxiosClient } from "../utils/axios"


const Signin = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  return (
    <div className="bg-green-200 h-screen flex justify-center">
      <div className="flex justify-center flex-col">
        <div className="w-80 bg-black rounded-lg text-center p-2  px-4 h-max">
          <Header label = {"SignIn"} />
          <SubHeading label = {"Enter credentials to login"} />
          <InputBox 
          onChange={(e) => {setUsername(e.target.value)}} 
          label={"E-Mail"} 
          placeholder = "abcd@mail.com"  />
          <InputBox 
          onChange={(e) => {setPassword(e.target.value)}}
          label={"Passsword"} 
          placeholder = "12345678" />
          <div className="pt-4">
          <Button onClick={async () => {
            const res = await AxiosClient.post("/user/signin", {
              username,
              password
            });
            // console.log(res.data.Token);
            navigate("/dashboard")
            localStorage.setItem("token",res.data.Token)
          }} label={"Sign In"} />
          </div>
          <BottomText label={"Don't have an account? "} buttonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>
  )
}

export default Signin