
import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faBehance} from '@fortawesome/free-brands-svg-icons'
import { faCog as gear } from '@fortawesome/free-solid-svg-icons'



export function Footer () {
    return (
      <main className='bg-primary mt-10'>
   
      <footer className="footer items-center p-4 text-light xl:container  
        mx-auto py-10">
  <div className="items-center ">
  <img src="/levelUP_3d.png" alt="levelUP Games" width={200} height={200} className="" /> 


<Link href="/admin" className=''>
 <div className='
font-mainfont text-light   
flex items-center gap-2 
 '> <FontAwesomeIcon 
 icon={gear} 
 className='text-light' 
></FontAwesomeIcon><p>Admin Page</p></div></Link>  <p className='text-xs font-mainfont'>Copyright © 2023 - All right reserved</p>

  </div> 
  <div className=" gap-4 md:place-self-center md:justify-self-end">
  <span className="font-mainfont text-2xl mb-2">Social</span> 

          <div className="grid grid-flow-col gap-4">

<Link href="https://github.com/cbarnett358?tab=repositories" rel="noopener noreferrer" target="_blank"> 

<span><FontAwesomeIcon icon={faGithub} 
size='2x' className='text-light'
></FontAwesomeIcon></span>
 </Link>
 <Link href="https://www.behance.net/chrisb-designs" rel="noopener noreferrer" target="_blank"> 

<span><FontAwesomeIcon icon={faBehance} 
size='2x' className='text-light'
></FontAwesomeIcon></span>
 </Link>
 <Link href="https://www.linkedin.com/in/chrisb-designs/" rel="noopener noreferrer" target="_blank"> 

<span><FontAwesomeIcon icon={faLinkedin} 
size='2x' className='text-light'
></FontAwesomeIcon></span>
 </Link>
 </div>

  </div>
</footer>
      </main>
    )
}