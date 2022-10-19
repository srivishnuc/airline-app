import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const useAuthentication = (checkurl) => {
    const user = useSelector(state => state.users.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (user[0]?.authorization !== checkurl) {
            navigate('/')
        }
    })

}

