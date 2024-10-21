import { Link } from "react-router-dom"

const BottomText = ({label,to,buttonText}) => {
  return (
    <div className=" flex justify-center text-white text-sm py-2">
        <div>{label}</div>
        <Link to={to} className="text-blue-300 font-bold underline">
        {buttonText}
        </Link>
    </div>
  )
}

export default BottomText