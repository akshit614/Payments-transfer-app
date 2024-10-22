
const ShowBalance = ({value}) => {
  return (
    <div className="w-60 text-lg  flex justify-between">
      Your Balance Rs <p className="font-bold text-green-500"> {value}</p>
     
    </div>
  )
}

export default ShowBalance