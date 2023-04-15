import { useState } from 'react'
import {FaTimes} from 'react-icons/fa'
import {setAlert, setGlobalState, setLoadingMsg, useGlobalState} from '../store'
import isteLogo from '../assets/iste.png'
import { updateNFT } from '../Blockchain.services'

const UpdateNFT = () => {
  const [modal] = useGlobalState('updateModal') 
  const [nft] = useGlobalState('nft')   
  const [price,setPrice] = useState(nft?.cost) 
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if( !price || price <= 0 )return 

    setGlobalState('modal', 'scale-0')
    setLoadingMsg('Initialising price update...')
    try {
      setLoadingMsg('Price updating...')
      setGlobalState('updateModal','scale-0')

      await updateNFT({id: nft?.id, cost: price})
      setAlert('Price updated...', 'green')
      window.location.reload()
    } catch (error) {
        setAlert('Update failed', 'red')
        console.log("error updating the price", error)
    }


    closeModal()
  } 
  

  const closeModal = () => {
    setGlobalState('updateModal', 'scale-0')
    resetForm()
  }

  const resetForm = () => {
    setPrice('')
  }

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal}`}>
        <div className="bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="flex justify-between items-center text-gray-400">
                    <p className="font-semibold ">Iste NFT</p>
                    <button type="button" 
                        onClick={closeModal} className="border-0 bg-transparent focus:outline-none">
                        <FaTimes className='text-gray-400'/>
                    </button>
                </div>

                <div className='flex justify-center rounded-xl items-center mt-5'>
                    <div className='shrink-0 rounded-xl overflow-hidden h-20 w-20'>
                        <img className='h-full w-full object-cover cursor-pointer' src={isteLogo} alt="Nft" />
                    </div>
                </div>   

               

                <div className='flex justify-between items-center bg-gray-800 rounded-xl mt-5'>
                    <input  type="number"  
                            className='block w-full text-sm text-slate-500
                            focus:outline-none cursor-pointer focus:ring-0 bg-transparent border-0'
                            placeholder='Price (ETH)'
                            min={0.01}
                            step={0.01}
                            name='Price'
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            required/>
                </div>   

                
                <button className="shadow-lg shadow-black text-sm text-white bg-[#e32970] hover:bg-[#bd255f] w-full px-2 py-2 mt-5 rounded-full ">Update</button>
            </form>
            
        </div>
    </div>
  )
}

export default UpdateNFT
