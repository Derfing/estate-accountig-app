import Link from 'next/link'
import React from 'react'
import { menuLinks } from '@/store/static'
import { useAppSelector } from '@/hooks'
import { useCookies } from 'react-cookie'

const Menu = () => {
	const curPageId = useAppSelector(state => state.curPage.curPageId)
	const [cookies] = useCookies(['login'])

	return (
		<nav className='menu'>
			{
				menuLinks.map(({name, href, inMenu}, index) => {
					if (!inMenu) return null

					const className = 'link' + (index === curPageId ? ' cur' : '')

					if (index === 7) {
						return <Link href={`/profile/${cookies.login}`} key={index} className={className}>{name}</Link>
					}
					return <Link href={href} key={index} className={className}>{name}</Link>
				})
			}
		</nav>
	)
}

export default Menu