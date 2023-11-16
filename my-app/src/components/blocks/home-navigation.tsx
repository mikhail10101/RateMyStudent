import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default function HomeNav() {
    return (
        <>
            <div className="w-screen h-24 flex flex-row flex-nowrap justify-evenly items-center">
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
                <Link className={`mr-4` } href="/login">
                    Log In
                </Link>
                <Link className={`${buttonVariants({ variant: "outline" })} mr-12 bg-black text-white`} href="/login">
                    Sign Up
                </Link>
            </div>
        </>
        
    )
}