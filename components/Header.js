import { useEffect, useState } from "react"
import {useAppContext} from '../components/Warper'

function Header() {
    const user = useAppContext()

    
    return (
        <div className="flex justify-between bg-[#101010] p-4  items-center">
            <h2 className="text-4xl h-fit font-[700] ">
                Edvora
            </h2>
            {user &&
                <div className="flex items-center ">
                    <h4 className="text-2xl h-fit ">
                        {user.name}
                    </h4>
                    <div className="w-14 h-14 rounded-full overflow-hidden mx-5">
                     <img className="w-full h-full" src={user.url} />
                    </div>
                    
                </div>
            }
        </div>
    )
}

export default Header

