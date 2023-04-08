import Link from 'next/link'
import React from 'react'
import { menuLinks } from '@/store/static'
import { useAppSelector } from '@/hooks'

const Menu = () => {
	const curPageId = useAppSelector(state => state.curPage.curPageId)

	return (
		<nav className='menu'>
			{
				menuLinks.map(({name, href, inMenu}, index) => (
					inMenu && <Link href={href} key={index} className={'link' + (index === curPageId ? ' cur' : '')}>{name}</Link>
				))
			}
		</nav>
	)
}

export default Menu