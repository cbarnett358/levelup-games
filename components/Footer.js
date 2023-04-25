
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faBehance} from '@fortawesome/free-brands-svg-icons'



export function Footer () {
    return (
        <footer className="footer p-10 mt-10 bg-primary text-light">
        <div>
        <Image src="/levelUP_Logo.png " alt="levelUP Games" width={200} height={200} className="" /> 
          <p className='text-xs font-mainfont'>Copyright © 2023 - All right reserved</p>
        </div> 
        <div>
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

    )
}