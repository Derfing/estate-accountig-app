import React from 'react'
import Image from 'next/image'

const Loader = () => {
	return (
		<div className='loader-wrap'>
			<Image src='/assets/icons/loader.gif' alt='loading...' width={120} height={100}/>
		</div>
	)
}

export default Loader