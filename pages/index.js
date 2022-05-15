import { useEffect, useState } from 'react'
import Item from '../components/Item'
import { useAppContext } from '../components/Warper'
import Filter from '../components/Filter'
import Head from 'next/head'

const allData = null

export default function Home() {
  
  const [data, setData] = useState(null)
  const [ids, setIds] = useState(null)
  const [filter,setFilter]= useState(null)
  const [CandS,setCandS]= useState({city:null,state:null})
  const [active,setActive]= useState('N')
  const user = useAppContext()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://assessment.api.vweb.app/rides');
      const resData = await res.json()
      allData = resData;
      setData(resData)
      let p = [], f = [], date = new Date().getTime,states=[],cities=[];
      resData.forEach((e) => {
        (date < e.data) ? (f.push(e.id)) : (p.push(e.id));
        (!states.includes(e.state))&&(states.push(e.state));
        (!cities.includes(e.city))&&(cities.push(e.city));
      })
      setIds({ past: p, future: f});
      setFilter({states,cities})
    }
    fetchData();
  }, [])



  const handlePast=()=>{
    let newD = allData.filter((e)=> ids.past.includes(e.id))
    setData(newD)
  }



  const handleFuture=()=>{
    let newD = allData.filter((e)=>{
      ids.future.includes(e.id)
    })
    setData(newD)
  }



const handleActive =(D)=>{
  if(D === active){
    return ' text-white  border-white scale-105 '
  }else{
    return ' border-transparent'
  }
}


const handleFilter = (C , S) =>{
  let result = (C & S)?(allData.filter((e)=>e.city === C).filter((e)=>e.state === S)):(C)?(allData.filter(e=>e.city===C)):(allData.filter(e=>e.state===S))

  setData(result);
  setCandS({city:C,state:S})
}


const clearFilter = ()=>{
  setData(allData);
  setCandS({city:null,state:null})
}







let style1 = 'm-4 p-1 border-b-2 transition-all ease-in-out duration-500 cursor-pointer '


  return (
    <div className=' overflow-scroll'>
      <Head>
        <title> Edvora || task</title>
        <link rel="shortcut icon" href="https://media.glassdoor.com/sqll/6459521/edvora-squarelogo-1647587142659.png" />
      </Head>
      <div className="flex justify-between text-xl  ">
        <div className='flex mx-5  '>
          <div className={style1 + handleActive('N')} onClick={()=>{setData(allData), setActive('N') }}>Nearest rides</div>
          <div className={style1 + handleActive('F')} onClick={()=>{handleFuture(), setActive('F') }}>Upcoming rides {ids && <span>({ids.future.length})</span>}</div>
          <div className={style1 + handleActive('P')} onClick={()=>{handlePast(), setActive('P') }}>Past rides{ids && <span className='mx-1'>({ids.past.length})</span>}</div>
        </div>
        <Filter CandS={CandS} data={filter} filter={handleFilter} clear={clearFilter} />
      </div>
      <div className='mx-10 pt-4 min-h-[80vh]'>
        {data && user && data.sort((a,b)=>Math.abs(a.origin_station_code - user.station_code )-Math.abs(b.origin_station_code-user.station_code)).map((e,i)=>{
          return <Item key={i+'item1'} data={e} />
        })}
      </div>
    </div>

  )
}
