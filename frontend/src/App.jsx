import { RouterProvider } from "react-router-dom"
import router from "./route"

function App(){
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}
// to create a history page that shows all the transaction of a account 
export default App