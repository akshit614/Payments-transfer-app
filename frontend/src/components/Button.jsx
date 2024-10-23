
const Button = ({label,onClick}) => {
  
  return <button onClick={onClick} type="button"
        className="w-full text-white bg-blue-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:text-black font-medium rounded-full text-lg py-2 me-6 mb-2 ">
            {label}
        </button>
    
  
}

export default Button