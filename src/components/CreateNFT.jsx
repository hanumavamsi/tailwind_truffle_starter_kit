import { useState } from 'react'
import {FaTimes} from 'react-icons/fa'
import {setAlert, setGlobalState, setLoadingMsg, useGlobalState} from '../store'
import isteLogo from '../assets/iste.png'
import { mintNFT } from '../Blockchain.services'
import { ThirdwebStorage } from "@thirdweb-dev/storage";


// First, instantiate the SDK
const storage = new ThirdwebStorage();

const auth =
 'Basic ' +
 Buffer.from(
    '2NSXQJcRPYs1gzS3zqoOWXPGlZD' + ':' + '9dcc2d9e07aecefc79f2e940b109a378',
 ).toString('base64')


const CreateNFT = () => {
  const [modal] = useGlobalState('modal')   
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('') 
  const [price,setPrice] = useState('') 
  const [fileUrl,setFileUrl] = useState('')   
  const [ipfsURL,setIpfsURL] = useState('')   
  const [imgBase64,setImgBase64] = useState(null)   

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if(!title || !price || !description)return 
    setGlobalState('modal', 'scale-0')
    setLoadingMsg('Uploading to IPFS...')
        // const created = await client.add(fileUrl)
    const metadataURI = `https://gateway.ipfscdn.io/ipfs/${ipfsURL}` 
    setLoadingMsg('Uploaded, approve transaction now..')
    const nft = { title, description, metadataURI, price }
    try {
        await mintNFT(nft)
        resetForm()
        setAlert('Minting completed...', 'green')
        window.location.reload()
        closeModal()
    } catch (error) {
        setAlert('Error minting', 'red')
        reportError(error)
        closeModal
    }

  } 
  
  const  changeImage =  async (e) => {
    const reader = new FileReader()
    if(e.target.files[0]) reader.readAsDataURL(e.target.files[0])

    reader.onload = async (readerEvent) => {
        const fileData = e.target.files[0];
        setLoadingMsg('Uploading to IPFS...')
        const uri = await storage.upload(fileData);
        setAlert('Uploaded to ipfs', 'green')
        console.log(uri)
        setImgBase64(readerEvent.target.result);
        setFileUrl(e.target.files[0])    
        setIpfsURL(uri.substring(7))
    }
  }


  const closeModal = () => {
    setGlobalState('modal', 'scale-0')
    resetForm()
  }

  const resetForm = () => {
    setFileUrl('')
    setTitle('')
    setImgBase64(null)
    setPrice('')
    setDescription('')
  }

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal}`}>
        <div className="bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="flex justify-between items-center text-gray-400">
                    <p className="font-semibold ">Add NFT</p>
                    <button type="button" 
                        onClick={closeModal} className="border-0 bg-transparent focus:outline-none">
                        <FaTimes className='text-gray-400'/>
                    </button>
                </div>

                <div className='flex justify-center rounded-xl items-center mt-5'>
                    <div className='shrink-0 rounded-xl overflow-hidden h-20 w-20'>
                        <img className='h-full w-full object-cover cursor-pointer' src={imgBase64 || isteLogo} alt="Nft" />
                    </div>
                </div>   
                <div className='flex justify-between items-center bg-gray-800 rounded-xl mt-5'>
                    <label className='block'>
                        <span className='sr-only'>Choose Profile Photo</span>
                        <input type="file" accept='image/png, image/gif, image/jpeg, image/jpg, image/webp' 
                        className='block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:hover:bg-[#1d2631] focus:outline-none cursor-pointer focus:ring-0'
                        onChange={changeImage}
                        required/>
                    </label> 
                </div>

                <div className='flex justify-between items-center bg-gray-800 rounded-xl mt-5'>
                    <input type="text"  
                            className='block w-full text-sm text-slate-500
                            focus:outline-none cursor-pointer focus:ring-0 bg-transparent border-0'
                            placeholder='Title'
                            name='Title'
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            required/>
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

                <div className='flex justify-between items-center bg-gray-800 rounded-xl mt-5'>
                    <textarea type="text" 
                            className='block w-full text-sm text-slate-500
                            focus:outline-none cursor-pointer focus:ring-0 bg-transparent border-0 h-20 resize-none'
                            placeholder='Description'
                            name='description'
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            required/>
                </div> 
                <button className="shadow-lg shadow-black text-sm text-white bg-[#e32970] hover:bg-[#bd255f] w-full px-2 py-2 mt-5 rounded-full ">Mint Now</button>
            </form>
            
        </div>
    </div>
  )
}

export default CreateNFT
