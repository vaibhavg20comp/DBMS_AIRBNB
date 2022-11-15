import React, {useState,useEffect} from 'react'
import Link from 'next/link';
import { GlobeAltIcon, LogoutIcon, MenuIcon, SearchIcon } from '@heroicons/react/outline';
import { UserCircleIcon } from '@heroicons/react/solid';

import AppLogo  from './AppLogo';
import {EAppLogo,EHeaderOptions} from '../utils/Enums'
import {formatGuests} from '../utils/guestUtils';
import {formatRangeDate} from '../utils/dateUtils';
import AppHeaderOption from './AppHeaderOption';
import AppSearchBar from './AppSearchBar';
import { useRouter } from 'next/navigation';

function AppHeader({exploreNearby,searchPage,query,user_info,color}) {
    const router = useRouter();
    const [isSnapTop, setIsSnapTop] = useState(searchPage===false ? false : true);
    console.log(searchPage);
    console.log(isSnapTop);
    const [isActiveSearch, setIsActiveSearch] = useState(
        searchPage ? false : true
    );
    const [activeMenu, setActiveMenu] = useState(
        EHeaderOptions.PLACES_TO_STAY
    );
    const handleOnScroll = () => {
        const position = window.scrollY;
        if (position >= 50) {
          setIsSnapTop(false);
          setIsActiveSearch(false);
        } else {
          setIsSnapTop(true);
          setIsActiveSearch(true);
        }
    };
    const headerBehavior = () => {
        let style = [];
        if (!isSnapTop) style.push('bg-white shadow-lg');
        if (!isActiveSearch) style.push('h-[86px] pb-5');
        if (isActiveSearch) style.push('pb-8');
        return style.join(' ');
    };
    useEffect(() => {
        // listen to scroll
        if (!searchPage) {
          window.addEventListener('scroll', handleOnScroll);
        }
        return () => window.removeEventListener('scroll', handleOnScroll);
      }, [searchPage]);
    
      function logout(){
        sessionStorage.clear();
        router.push('/Login');
      }

    return (
        <>
            <header
            className={`${headerBehavior()} z-50 fixed top-0 w-full pt-5 duration-300 md:transition-none`}
            >
                {/* header top */}
                <div
                className={`${
                searchPage ? 'px-7' : 'container'
                } hidden md:grid md:grid-cols-[auto,1fr,auto] xl:grid-cols-[1.5fr,3fr,1.5fr] 2xl:grid-cols-[1fr,3fr,1fr] items-start`}
                >
                    {/* Left side logo */}
                    <div className="flex items-center h-12">
                        <Link href="/" legacyBehavior>
                            <a>
                            <AppLogo
                                className={`${
                                isSnapTop ? 'text-white' : 'text-primary'
                                } hidden xl:block`}
                                type={EAppLogo.TEXT}
                                color={color}
                            />
                            <AppLogo
                                className={`${
                                isSnapTop ? 'text-white' : 'text-primary'
                                } block xl:hidden`}
                                type={EAppLogo.LOGO}
                                color={color}
                            />
                            </a>
                        </Link>
                    </div>
                    {/* Small search Bar */}
                    <button
                        className={`${
                        isActiveSearch && 'scale-[1.33] translate-y-[75px] opacity-0 z-[-50]'
                        } ${
                        searchPage ? 'pl-3' : 'pl-6'
                        } relative flex items-center h-12 pr-2 mx-auto text-left transform bg-white border border-gray-200 rounded-full shadow-md cursor-pointer min-w-[320px] hover:shadow-lg md:absolute left-24 lg:left-auto lg:right-1/2 lg:translate-x-1/2 duration-200`}
                        onClick={() => setIsActiveSearch(true)}
                    >
                        {searchPage ? (
                        <span className="flex-grow text-sm font-medium tracking-wide text-gray-500">
                            <span className="px-4 py-1 border-r border-gay-200">
                            {query.location || (
                                <span className="font-normal text-gray-300">Location</span>
                            )}
                            </span>
                            <span className="px-4 py-1 border-r border-gay-200">
                            {formatRangeDate(query.checkIn, query.checkOut) || (
                                <span className="font-normal text-gray-300">Add dates</span>
                            )}
                            </span>
                            <span className="px-4 py-1">
                            {formatGuests(query.guests, { noInfants: true }) || (
                                <span className="font-normal text-gray-300">Add guests</span>
                            )}
                            </span>
                        </span>
                        ) : (
                        <span className="flex-grow text-sm font-medium tracking-wide text-gray-500">
                            Start your search
                        </span>
                        )}
                        <SearchIcon className="h-8 p-2 ml-3 text-white rounded-full bg-primary" />
                    </button>
                    {/* middle side navigation */}
                    <div className="relative flex flex-col items-center justify-center order-last col-span-2 xl:order-none xl:col-span-1">
                        <div className="text-white">
                            <AppHeaderOption
                                isSnap={isSnapTop}
                                isActiveHeader={isActiveSearch}
                                active={activeMenu === EHeaderOptions.PLACES_TO_STAY}
                                onClick={() => setActiveMenu(EHeaderOptions.PLACES_TO_STAY)}
                                color={color}
                            >
                                Places to stay
                            </AppHeaderOption>
                            <AppHeaderOption
                                isSnap={isSnapTop}
                                isActiveHeader={isActiveSearch}
                                active={activeMenu === EHeaderOptions.FIND_EXPERIENCES}
                                onClick={() => setActiveMenu(EHeaderOptions.FIND_EXPERIENCES)}
                                color={color}
                            >
                                Experiences
                            </AppHeaderOption>
                            <AppHeaderOption isSnap={isSnapTop} isActiveHeader={isActiveSearch} color={color}>
                                <Link href="/" legacyBehavior>
                                    <a>
                                    Online Experiences
                                    </a>
                                </Link>
                            </AppHeaderOption>
                        </div>
                    </div>
                    {/* Right side navigation */}
                    <div className="flex items-center justify-end">
                        <Link href="/hosting/propertyTypeGroup" legacyBehavior>
                        <a
                            className={`${
                            isSnapTop
                                ? 'text-white hover:bg-white hover:bg-opacity-10'
                                : 'text-gray-500 hover:bg-gray-100 '
                            } flex items-center h-10 px-4 rounded-full font-medium tracking-wide text-sm`}
                        >
                            Become a host
                        </a>
                        </Link>
                        <Link href="/" legacyBehavior>
                        <a
                            className={`${
                            isSnapTop
                                ? 'text-white hover:bg-white hover:bg-opacity-10'
                                : 'text-gray-500 hover:bg-gray-100 '
                            } flex items-center h-10 px-3 mr-1 rounded-full `}
                        >
                            <GlobeAltIcon className="h-5" />
                        </a>
                        </Link>
                        <button className="flex items-center pl-3 pr-1 bg-white border border-gray-200 rounded-full h-11 hover:shadow-md">
                        {/* <MenuIcon className="h-5 mr-2 text-gray-300" />
                        <UserCircleIcon className="h-10 text-gray-300" /> */}
                            Hello {user_info.firstname}
                        </button>
                        <button className="flex items-center pl-3 pr-1 bg-white border border-gray-200 rounded-full h-11 hover:shadow-md" onClick={(e) => {logout()}}>
                        {/* <MenuIcon className="h-5 mr-2 text-gray-300" />
                        <UserCircleIcon className="h-10 text-gray-300" /> */}
                            Logout
                        </button>
                    </div>
                </div>
                {/* main search bar */}
                <AppSearchBar
                menu={activeMenu}
                isActiveHeader={isActiveSearch}
                searchPage={searchPage}
                closeSearch={() => setIsActiveSearch(false)}
                />

            </header>
        </>
    )
}

export default AppHeader