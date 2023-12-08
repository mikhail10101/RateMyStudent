import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import clsx from 'clsx'

import { Settings } from 'lucide-react'

import { auth } from '../../../../auth'

export default async function HomeNav() {
    const session = await auth()

    return (
        <>
            <div className="h-24 flex flex-row flex-nowrap justify-evenly items-center">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
                    className="ml-12 mr-3">
                    <Image
                        src="/square-facebook.svg"
                        height={20}
                        width={20}
                        alt="facebook"
                    />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"
                    className="mx-3">
                    <Image
                        src="/square-instagram.svg"
                        height={20}
                        width={20}
                        alt="instagram"
                    />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"
                    className="ml-3 mr-auto">
                    <Image
                        src="/square-x.svg"
                        height={20}
                        width={20}
                        alt="twitter"
                    />
                </a>
                <Link
                    className={clsx({"hidden": !session})}
                    href="/account/profile"
                >
                    <Settings className="mr-12 h-7 w-7"></Settings>
                </Link>
                <div className={clsx({"hidden": session})}>
                    <Link href="/login" className="mr-4">Log In</Link>
                    <Link href="/signup" className={`${buttonVariants({ variant: "outline" })} mr-12 bg-black text-white`}>Sign Up</Link>
                </div>
            </div>
        </>

    )
}