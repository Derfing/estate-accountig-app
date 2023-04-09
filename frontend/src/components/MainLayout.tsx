import React, { useEffect } from 'react'
import Footer from './Footer'
import Header from './Header'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { setCurPage } from '@/store/slices/pageSlice'
import { menuLinks } from '@/store/static'
import { setIsLoginned } from '@/store/slices/userSlice'

const MainLayout = ({children}: any) => {
	const router = useRouter()
  const dispatch = useAppDispatch()
	const is_loginned = useAppSelector(state => state.user.is_loginned)

	const handleExit_ = () => dispatch(setIsLoginned({is_loginned: false}))
  const handleChangePage = (curPageIndex: number) => dispatch(setCurPage({curPageIndex}))

  useEffect(() => {
    const link_index = menuLinks.findIndex(link => link.href === router.pathname)
    if (link_index > -1) {
      handleChangePage(link_index)
    }
  }, [router.pathname])

	function handleExit() {

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