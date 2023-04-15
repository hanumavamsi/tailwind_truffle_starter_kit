import { FaRegTimesCircle } from "react-icons/fa"
import {BsCheck2Circle} from 'react-icons/bs'
import { useGlobalState } from "../store"
const Alert = () => {
  const [alert] = useGlobalState('alert')
  return (
    <div>
       <div className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 transform transition-transform duration-300 ${alert.show? 'scale-100' : 'scale-0'}`}>
            <div className="bg-[#151c25] shadow-xl shadow-  [#e32970] rounded-xl min-w-min px-10 py-3 flex flex-col justify-center items-center">

              {alert.color == 'red' ?(
           
                  <FaRegTimesCircle className="text-red-600 text-4xl"/>
              ):(
           
                  <BsCheck2Circle className="text-green-600 text-4xl"/>
              )}
              <p className="text-white">{alert.msg}</p>
            </div>
        </div>
    </div>
  )
}

export default Alert
