import { useState } from 'react'
import Identicon from 'react-identicons'
import {FaTimes} from 'react-icons/fa'
import {setAlert, setGlobalState, useGlobalState} from '../store'
import isteLogo from '../assets/iste.png'
import { buyNFT } from '../Blockchain.services'

const ShowNFT = () => {
  const [modal] = useGlobalState('showModal')   
  const [connectedAccount] = useGlobalState('connectedAccount')
  const [nft] = useGlobalState('nft')   

  const changePrice = () => {
    setGlobalState('nft',nft)
    setGlobalState('showModal','scale-0')
    setGlobalState('updateModal','scale-100')
  }

  const handleNFTPurchase = async () => {
    setGlobalState('showModal', 'scale-0')
    setGlobalState('loading', {
      show: true,
      msg: 'Initializing NFT transfer...',
    })

    try {
      await buyNFT(nft)
      setAlert('Transfer completed...', 'green')
      window.location.reload()
    } catch (error) {
      console.log('Error transfering NFT: ', error)
      setAlert('Purchase failed...', 'red')
    }
  }
  

  const closeModal = () => {
    setGlobalState('showModal', 'scale-0')
    resetForm()
  }

  const truncate = (text, startChars, endChars, maxLength) => {
    if (text.length > maxLength) {
      var start = text.substring(0, startChars)
      var end = text.substring(text.length - endChars, text.length)
      while (start.length + end.length < maxLength) {
        start = start + '.'
      }
      return start + end
    }
    return text
}

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal}`}>
        <div className="bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
            <div  className="flex flex-col">
                <div className="flex justify-between items-center text-gray-400">
                    <p className="font-semibold ">Buy NFT</p>
                    {console.log(nft?.metadataURI)}
                    <button type="button" 
                        onClick={closeModal} className="border-0 bg-transparent focus:outline-none">
                        <FaTimes className='text-gray-400'/>
                    </button>
                </div>

                <div className='flex justify-center rounded-xl items-center mt-5'>
                    <div className='shrink-0 rounded-xl overflow-hidden h-40 w-40'>
                        <img className='h-full w-full object-cover cursor-pointer' src={nft?.metadataURI} alt={nft?.title} />
                    </div>
                </div> 

                <div className='flex flex-col justify-start rounded-xl mt-5'>
                    <h4 className='text-white font-semibold'>{nft?.title}</h4>
                    <p className='text-gray-400 text-xs my-1'>{nft?.description}</p>

                    <div className='flex justify-between items-center mt-3 text-white'>
                        <div className='flex justify-start items-center'>
                            <Identicon string={nft?.owner} size={50} className = "h-10 w-10 object-contain rounded-full mr-3 "/>
                            <div className='flex flex-col justify-center items-center'>
                            <small className='font-bold'>@Owner</small>
                            <small className='font-bold text-pink-800'>{nft?.owner ? truncate(nft?.owner,4,4,11) : ''}</small>
                        </div>
                        </div>
                        <div className='flex flex-col'>
                            <small className='text-xs'>Current Price</small>
                            <p className='text-xs font-extrabold'>{nft?.cost} ETH</p>
                        </div>
                    </div>

                </div>

                {connectedAccount == nft?.owner ? 
                (
                    <button className="flex justify-center shadow-lg shadow-black text-sm text-white bg-[#e32970] hover:bg-[#bd255f] w-full px-2 py-2 mt-5 rounded-full " onClick={changePrice}>Change Price
                    </button>
                ) 
                : 
                (
                    <button className=" flex justify-center shadow-lg shadow-black text-sm text-white bg-[#e32970] hover:bg-[#bd255f] w-full px-2 py-2 mt-5 rounded-full" onClick={handleNFTPurchase}>Purchase
                    </button>
                )
                }
                 
            </div>
            
        </div>
    </div>
  )
}

export default ShowNFT
