import React, { useEffect } from 'react'
import Footer from './Footer'
import Header from './Header'
import { useRouter } from 'next/router'
import { useAppDispatch } from '@/hooks'
import { setCurPage } from '@/store/slices/pageSlice'
import { menuLinks } from '@/store/static'
import { useCookies } from 'react-cookie'

const MainLayout = ({children}: any) => {
	const [cookies, setCookie, removeCookie] = useCookies(['is_loginned'])
	const router = useRouter()
  const dispatch = useAppDispatch()

  const handleChangePage = (curPageIndex: number) => dispatch(setCurPage({curPageIndex}))

  useEffect(() => {
    const link_index = menuLinks.findIndex(link => link.href === router.pathname)
    if (link_index > -1) {
      handleChangePage(link_index)
    }
  }, [router.pathname])

	function handleExit() {
		removeCookie('is_loginned')
		router.push('/login')
	}
	
	return (
		<>
			<button type='button' className='exit-btn' onClick={handleExit}>Выйти</button>
			<Header/>
			<main>
				{children}
			</main>
			{
				//<Footer/>
			}
		</>
	)
}

export default MainLayout