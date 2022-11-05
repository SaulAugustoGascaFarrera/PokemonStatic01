import Head  from "next/head"
import { FC } from "react";
import {useTheme} from '@nextui-org/react'
import { Navbar } from '../ui';
import { useRouter } from "next/router";


interface Props{
    children: any;
    title?:string;
}


const origin = (typeof window === 'undefined') ? '' : window.location.origin

export const Layout : FC<Props> = ({children,title}) => {


    const {isDark} = useTheme()


   



  return (
    <>
        <Head>
            <title>{title || "Pokemon App"}</title>
            <meta name="author" content="Saul Augusto Gasca Farrera" />
            <meta name="description" content="Data about the pokemon" />
            <meta name="keywords" content="Pokedex,Pokemon,XXXXX" />
            <meta property="og:title" content={`Information about ${title}`} />
            <meta property="og:description" content={`This is the page about ${title}`} />
            <meta property="og:image" content={`${origin}/img/banner.png`} />
        </Head>

        <Navbar /> 

        <main>
            {children}
        </main>

    </>
  )
}
