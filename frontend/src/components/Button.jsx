
const Button = ({label,onClick}) => {
  
  return <button onClick={onClick} type="button"
        className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none hover:ring-2 focus:ring-yellow-300 font-medium rounded-full text-lg py-2 me-6 mb-2 ">
            {label}
        </button>
    
  
}

export default Button