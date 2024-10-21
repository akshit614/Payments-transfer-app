
const InputBox = ({label,placeholder,onChange}) => {
  return (
    <div>
        <div className="text-lg text-white font-medium py-2">
            {label}
        </div>
        <input type="text" placeholder={placeholder} onChange={onChange} className="border-2 rounded-md w-full px-2 py-1"/>
        
    </div>
  )
}

export default InputBox