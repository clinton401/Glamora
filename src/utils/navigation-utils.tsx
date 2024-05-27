"use client"
import {useRouter} from "next/navigation"
function useNavigationUtil(routePath:  string) {
    const router = useRouter()
    const routeHandler = () => {
        router.push(routePath)
    }
  return routeHandler;
}

export default useNavigationUtil
