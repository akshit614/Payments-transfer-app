import { useState } from "react";
import { useSearchParams } from 'react-router-dom';
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import { AxiosClient } from "../utils/axios";

const Transfer = () => {

  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  return (
    <div className="flex justify-center h-screen items-center bg-green-200">
       <div className="flex flex-col h-full justify-center">
        <div className="border shadow-lg bg-gray-900 rounded-lg text-white max-w-md space-y-8 h-min w-80">
          <div className="p-6">
            <h2 className="font-bold text-3xl text-center">Transfer Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center rounded-full w-12 h-12 bg-green-500">
                <span className="font-bold items-center text-black text-3xl">{name[0].toUpperCase()}</span>
              </div>
              <h3 className="text-3xl font-semibold">{name}</h3>
            </div>
            <div className="space-y-4">
              <div className="text-black">
                <InputBox label={"Amount (in rs)"} placeholder={"Enter amount"}
                onChange={(e) => {setAmount(e.target.value)}}/>
              </div>
              <Button label={"Transfer"} onClick={async () => {
                await AxiosClient.post("/account/transfer", {
                  to : id,
                  amount
                },{
                  headers : {
                    Authorization : "Bearer " + localStorage.getItem("token")
                  }
                })
              }}/>
            </div>
          </div>
        </div>
       </div>
    </div>
  )
}

export default Transfer