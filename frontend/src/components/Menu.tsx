import Link from 'next/link'
import React from 'react'
import { menuLinks } from '@/store/static'

const Menu = () => (
	<nav className='menu'>
		{
			menuLinks.map(({name, href, inMenu}, index) => (
				inMenu && <Link href={href} key={index} className='link'>{name}</Link>
			))
		}
	</nav>
)

export default Menu