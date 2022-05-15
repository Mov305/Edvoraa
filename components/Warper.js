import { useContext, createContext,useState,useEffect } from 'react'

const AppContext = createContext()


function Warper({ children }) {

    const [user, SetUser] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://assessment.api.vweb.app/user').catch(err => console.log(err))
            const data = await res.json().catch(err => console.log(err))
            SetUser(data)
        }
        fetchData();
    }, [])
    return (
        <AppContext.Provider value={user}>
            {children}
        </AppContext.Provider>
    )
}




export const useAppContext = () => {
    return useContext(AppContext)
}

export default Warper