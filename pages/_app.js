import '../styles/globals.css'
import Header from '../components/Header'
import Warper from '../components/Warper'
import { AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps }) {

  return (
    <AnimatePresence>
      <Warper>
        <div className='flex flex-col text-[#d0cbcb] font-sans h-screen bg-[#292929]'>
          <Header />
          <Component {...pageProps} />
        </div>
      </Warper>
    </AnimatePresence>


  )
}

export default MyApp
