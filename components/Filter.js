import { BsFilterRight } from 'react-icons/bs'
import { AiOutlineCloseCircle, AiFillDelete } from 'react-icons/ai'
import { IoMdArrowDropdown } from 'react-icons/io'
import { useState } from 'react'

function Filter({ data, CandS, filter, clear }) {
    const [active, setActive] = useState(false)
    const [aC, setAC] = useState(false)
    const [aS, setAS] = useState(false)


    const handleFilter = (e1, e2) => {
        filter(e1, e2)
        setActive(false)
        setAC(false)
        setAS(false)
    }

    const clearFilter = () => {
        clear()
        setActive(false)
        setAC(false)
        setAS(false)
        console.log('cleared')

    }

    return (
        <div className='flex mx-10 my-5 relative text-[#d0cbcb]'>
            <div className='flex z-10 cursor-pointer hover:text-white hover:scale-105' onClick={() => setActive(!active)}>
                {!active ?
                    <>
                        <BsFilterRight className='m-1 text-2xl' />
                        <span>
                            Filters
                        </span>
                    </> : <div className='m-1 text-2xl text-[#a19f9f]'> <AiOutlineCloseCircle /> </div>}
            </div>
            {active &&
                <div className=' absolute w-[250px] min-h-[200px] right-0 rounded-2xl bg-black py-3 px-8' >
                    <div className='flex justify-between text-[#a19f9f] border-[#a19f9f] border-b py-3 '>
                        <div className=''>Filter</div>
                        <div className='cursor-pointer' onClick={()=>clearFilter()}>
                            <AiFillDelete />
                        </div>


                    </div>
                    <div className='my-3 p-2 bg-[#292929] rounded-xl relative '>
                        <div className='flex justify-between cursor-pointer' onClick={() => { setAC(!aC), setAS(false) }}>
                            <span>{CandS.city ? CandS.city : 'City'}</span>   <IoMdArrowDropdown className='mt-[5px]' />
                        </div>
                        {aC && <div className=' absolute z-10 top-[50px] rounded-2xl border w-full m-[-7px] p-2 bg-black max-h-[500px] overflow-scroll'>
                            {data.cities.map((e) => <div key={e} className='rounded-2xl bg-[#292929] my-3 text-center  cursor-pointer hover:text-white'
                                onClick={() => handleFilter(e, CandS.state)}> {e} </div>)}


                        </div>}
                    </div>
                    <div className='my-3 p-2 bg-[#292929] rounded-xl  relative'>
                        <div className='flex justify-between cursor-pointer' onClick={() => { setAS(!aS), setAC(false) }}>
                            <span>{CandS.state ? CandS.state : 'State'}</span>   <IoMdArrowDropdown className='mt-[5px]' />
                        </div>

                        {aS && <div className=' absolute z-10 top-[50px] rounded-2xl border w-full m-[-7px] p-2 bg-black max-h-[500px] overflow-scroll'>
                            {data.states.map((e) => <div key={e} className='rounded-2xl bg-[#292929] my-3 text-center cursor-pointer hover:text-white'
                                onClick={() => handleFilter(CandS.city, e)}> {e} </div>)}
                        </div>}

                    </div>

                </div>}
        </div>
    )
}

export default Filter