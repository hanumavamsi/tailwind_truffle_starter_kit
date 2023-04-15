import isteLogo from '../assets/iste.png'
import isteLogo2 from '../assets/isteLogo.png'
import { connectWallet } from '../Blockchain.services'
import { truncate, useGlobalState } from '../store'

const header = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  return (
    <div className='w-4/5 flex justify-between md:justify-center items-center py-4 mx-auto'>
      <div className='md:flex-[0.99] flex-initial justify-center items-center'>
        <img className="w-20 cursor-pointer" src={isteLogo2} alt="Logo"/>
      </div>
      <ul className='md:flex-[0.5] text-white md:flex hidden list-none flex-row justify-between items-center'>
        <li className='mx-4 cursor-pointer'>Market</li>
        <li className='mx-4 cursor-pointer'>Artist</li> 
        <li className='mx-4 cursor-pointer'>Features</li>
        <li className='mx-4 cursor-pointer'>Community</li>
      </ul>
      {connectedAccount ? (
        <button 
        className='shadow-xl shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] md:text-xs p-3 rounded-full'
        onClick={connectWallet}  
        >
          {truncate(connectedAccount,4,4,11)}
        </button>
      ) : (
        <button 
        className='shadow-xl shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] md:text-xs p-3 rounded-full'
        onClick={connectWallet}  
      >
        Connect Wallet
      </button>
      )}
    </div>
  )
}

export default header
