
const ShowBalance = ({value}) => {
  return (
    <div className="w-60 text-lg flex justify-between">
      Your Balance Rs <p className="font-bold"> {value}</p>
     
    </div>
  )
}

export default ShowBalance