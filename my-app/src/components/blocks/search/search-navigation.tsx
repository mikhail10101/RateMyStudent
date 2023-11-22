'use client';

import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export default function SearchNavigation() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams)
        params.set('page','1')
        if (term) {
            params.set('query',term)
        } else {
            params.delete('query')
        }
        replace(`${pathname}?${params.toString()}`)
    }, 300)

    return (
        <>
            <div className="fixed w-full flex flex-row bg-black items-center h-16">
                <Image
                    src="/logo_shortened.png"
                    width={100}
                    height={40}
                    alt="logo"
                    className="ml-3"
                />
                <div className="flex flex-row items-center space-x-2 mr-auto">
                    <div className="flex flex-row items-center">
                        <Image
                            src="/magnifying-glass.svg"
                            width={20}
                            height={20}
                            alt="Search"
                        />
                        <p className="text-white">Students</p>
                    </div>
                    <div>
                        <input
                            className="block rounded-3xl text-base outline-0 placeholder:text-gray-500 h-[2.5rem] w-[20rem] text-left pl-3"
                            placeholder="Enter name"
                            onChange={(e) => {
                                handleSearch(e.target.value);
                            }}
                            defaultValue={searchParams.get('query')?.toString()}
                        />
                    </div>
                </div>
                <Link href="/login" className="mr-4 text-white">Log In</Link>
                <Link href="/signup" className={`${buttonVariants({ variant: "outline" })} mr-12 bg-white text-black`}>Sign Up</Link>
            </div>
            <div className="h-20"></div>
        </>
    )
}