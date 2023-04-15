import Identicon from 'react-identicons'
import {setGlobalState, truncate, useGlobalState} from '../store'
const ayushImg = 'https://iste.nitk.ac.in/api//media/profile_pictures/591_Ayush_.jpg'
import crypt_logo from '../assets/iste-crypt logo.jpg'
import isteLogo from '../assets/iste.png'
const Hero = () => {
const [connectedAccount] = useGlobalState('connectedAccount') 
  return (
    <div className="flex flex-col md:flex-row w-4/5 justify-between items-center mx-auto py-10">
        <div className="md:w-3/6 w-full">
            <div>
                <h1 className="text-white text-5xl font-bold">
                    Buy and Sell<br/>
                    Digital Arts, <br/>
                    <span class="text-gradient">NFTs </span>
                     Collections
                </h1>
                <p className="text-gray-500 font-semibold text-sm mt-3">Mint and collect the hottest NFTs around</p>
            </div>
            <div className="flex mt-5">
                <button onClick = {()=> setGlobalState('modal','scale-100')} className="shadow-xl shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] p-2 rounded-full ">
                    Create NFT
                </button>
            </div>
            <div className="w-3/4 flex justify-between items-center mt-5">
                <div className="text-white">
                    <p className="text-bold">22k</p>
                    <small className="text-gray-300">Users</small>
                </div>
                <div className="text-white">
                    <p className="text-bold">42k</p>
                    <small className="text-gray-300">Artworks</small>
                </div>
                <div className="text-white">
                    <p className="text-bold">10k</p>
                    <small className="text-gray-300">Artists</small>
                </div>
            </div>
        </div>
        <div className="shadow-xl shadow-black md:w-2/5 w-full
        mt-10 md:mt-0 rounded-md overflow-hidden bg-gray-800">
            <img className="h-80 w-full object-cover" src={crypt_logo} alt="Hero"/>
            <div className='flex justify-start items-center p-3'>
                <Identicon 
                className="h-10 w-10 object-contain rounded-full mr-3" string={connectedAccount} size={50}/>
                <div >
                    <p className='text-white font-semibold'> 
                        {
                        connectedAccount? 
                            truncate(connectedAccount, 4, 4, 11)
                            : 'Connect Your Wallet'}
                </p>
                    <small className='text-pink-800 font-bold'>@you</small>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero
