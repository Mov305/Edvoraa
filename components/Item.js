import { useAppContext } from "./Warper"

function Item({data}) {
  let {station_code} = useAppContext()


  const handleDate = (date)=>{
      let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"],
      month=parseInt(date.slice(0,2)),day=(parseInt(date.slice(3,5))===1)?'1st ':(parseInt(date.slice(3,5))===2)?'2nd ':parseInt(date.slice(3,5))+'th ',
      year=date.slice(6,10),hour=date.slice(11,13),min=date.slice(14,16),st=date.slice(17,19)
      let time =(st === 'AM')?(hour+':'+min):((parseInt(hour)+12)+':'+min)
      let result = day+months[month-1]+' '+year +' ' +time
      
      return result
      
  }


  return (
    <div className="bg-[#171717] rounded-xl w-full mb-5 flex p-6 justify-between " >
        <div className="flex">
        <div className="w-[300px] h-[150px] overflow-hidden rounded-lg">
            <img src={data.map_url} className="w-full h-full" alt="" />
        </div>
        <div className="ml-5 text-xl">
         <div className="mb-[3px]">Ride id: <span className="text-white">{data.id}</span></div>
         <div className="mb-[3px]">Origin station: <span className="text-white">{data.origin_station_code}</span></div>
         <div className="mb-[3px]">Station_path: <span className="text-white">[ {data.station_path.join(', ')}]</span></div>
         <div className="mb-[3px]">Date: <span className="text-white">{handleDate(data.date)}</span></div>
         <div className="mb-[3px]">Distance: <span className="text-white">{Math.abs(data.origin_station_code-station_code)}</span></div>
        </div>
        </div>
        
       
        <div className="mx-4 text-white">
            <span className="bg-[#101010] mx-2 py-[3px] px-2 rounded-full">
                {data.city}
            </span>
            <span className="bg-[#101010] mx-2 py-[3px] px-2 rounded-full">
                {data.state}
            </span>
        </div>
    </div>
  )
}

export default Item