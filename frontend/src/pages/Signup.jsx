import { useState } from "react"
import Button from "../components/Button"
import Header from "../components/Heading"
import InputBox from "../components/InputBox"
import SubHeading from "../components/SubHeading"
import { useNavigate } from "react-router-dom"
import BottomText from "../components/BottomText"
import { AxiosClient } from "../utils/axios"

const Signup = () => {

  const [username, setUsername] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  return (
    <div className="bg-green-200 h-screen flex justify-center">
      <div className="flex justify-center flex-col">
        <div className="w-80 bg-black rounded-lg text-center p-2  px-4 h-max">
          <Header label = {"SignUp"} />
          <SubHeading label = {"Enter credentials to create Account"} />
          <InputBox 
          onChange={(e) => {setUsername(e.target.value)}} 
          label={"E-Mail"} 
          placeholder = "abcd@mail.com"  />
          <InputBox 
          onChange={(e) => {setFirstname(e.target.value)}}
          label={"First Name"} 
          placeholder = "firstname" />
          <InputBox 
          onChange={(e) => {setLastname(e.target.value)}}
          label={"Last Name"} 
          placeholder = "lastname" />
          <InputBox 
          onChange={(e) => {setPassword(e.target.value)}}
          label={"Passsword"} 
          placeholder = "12345678" />
          {console.log(username)}
          <div className="pt-4">
          <Button onClick={async () => {
            const response = await AxiosClient.post("/user/signup", {
              username,
              firstname,
              lastname,
              password
            });
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
          }} label={"Sign up"} />
          </div>
          <BottomText label={"Already have an account? "} buttonText={"Sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
  )
}

export default Signup