import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'


// components import
import AppHeader from '../components/AppHeader'
import Hero from '../components/Hero'
import AppSection from '../components/AppSection'
import TestCard from '../components/TestCard'
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from 'react'
import { UserContext } from './_app'

export default function Home() {
  const router = useRouter();
  const {user, setUser} = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (typeof window!=='undefined'){
      if (sessionStorage.getItem('user_info')===null){
        router.push('/Login');
      } else{
        setUserInfo(JSON.parse(sessionStorage.getItem('user_info')));
      }
    }
  }, [])
  
  console.log(userInfo);
  return (
    <>
      <AppHeader user_info={userInfo} color={"white"}/>
      <main>
        <Hero/>
        <AppSection
        title = "Live Anywhere"
        className="grid grid-cols-1 md:grid-cols-2 lg:gap-x-4 gap-x-1 gap-y-2 lg:grid-cols-4"
        >
          <TestCard/>
          {/* <PropertyCard  className="grid grid-cols-2 lg:gap-x-4 gap-x-1 gap-y-2 lg:grid-cols-4"/> */}
        </AppSection>
      </main>
    </>
  )
}



