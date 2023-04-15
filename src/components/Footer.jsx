const ayushImg = 'https://iste.nitk.ac.in/api//media/profile_pictures/591_Ayush_.jpg'
import isteLogo from '../assets/iste.png'
import isteLogo2 from '../assets/isteLogo.png'
const Footer = () => {
  return (
    <div className="w-full flex flex-col md:justify-center justify-between items-center gradient-bg-footer p-4">
        <div className='flex w-full sm:flex-row flex-col justify-between items-center my-4'>
            <div className='flex flex-[0.24] justify-center items-center'>
                <img className='w-20' src={isteLogo2} alt="iste-logo" />
            </div>
            <div className='flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full text-white text-base text-center'>
                <p className='cursor-pointer mx-2'>Market</p>
                <p className='cursor-pointer mx-2'>Artists</p>
                <p className='cursor-pointer mx-2'>Features</p>
                <p className='cursor-pointer mx-2'>Community</p>
            </div>
            <div className='flex flex-[0.25] justify-center items-center'>
                <p className='text-white text-right text-sm'>&copy; 2023 All rights reserved</p>
            </div>
        </div>
    </div>
  )
}

export default Footer
