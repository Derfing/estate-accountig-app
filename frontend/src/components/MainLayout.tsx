import React, { useEffect } from 'react'
import Image from 'next/image'
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
		handleExit_()
		router.push('/login')
	}
	
	return (
		<>
			<button type='button' className='exit-btn' onClick={handleExit}>
				Выйти
				<Image src='/assets/icons/logout-icon.png' alt='logout-icon' width={15} height={15}/>
			</button>
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