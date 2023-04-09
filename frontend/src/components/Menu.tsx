import Link from 'next/link'
import React from 'react'
import { menuLinks } from '@/store/static'
import { useAppSelector } from '@/hooks'
import { useCookies } from 'react-cookie'

const Menu = () => {
	const curPageId = useAppSelector(state => state.curPage.curPageIndex)
	const [cookies] = useCookies(['login'])

	return (
		<nav className='menu'>
			{
				menuLinks.map(({name, href, inMenu}, index) => {
					if (!inMenu) return null

					const className = 'link' + (index === curPageId ? ' cur' : '')

					if (index === 3) {//установить id карточки в useEffect
						return <Link href={{pathname: href, query: {id: '1'}}} key={index} className={className}>{name}</Link>
					}
					if (index === 4) {
						return <Link href={{pathname: href, query: {id: '1'}}} key={index} className={className}>{name}</Link>
					}
					if (index === 5) {

					}
					if (index === 6) {

					}
					if (index === 7) {
						return <Link href={{pathname: href, query: {login: cookies.login}}} key={index} className={className}>{name}</Link>
					}

					return <Link href={href} key={index} className={className}>{name}</Link>
				})
			}
		</nav>
	)
}

export default Menu