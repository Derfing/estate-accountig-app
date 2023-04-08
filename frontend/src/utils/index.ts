import { useRouter } from "next/router"
import { useCookies } from "react-cookie"

const [cookies, setCookie, removeCookie] = useCookies(['is_loginned'])
const router = useRouter()

export const checkIsLoginned = () => {
	if (!cookies.is_loginned) {
		router.push('/login')
	}
}