import Image from "next/image"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import clsx from "clsx"
import Temp from "./temp"
import { auth, signOut } from "../../../../auth"

export default async function SearchNavigation() {
    const session = await auth()
    return (
        <>
            <div className="fixed w-full flex flex-row bg-black items-center h-16">
                <Link href="/">
                    <Image
                        src="/logo_shortened.png"
                        width={100}
                        height={40}
                        alt="logo"
                        className="ml-3"
                    />
                </Link>
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
                        < Temp />
                    </div>
                </div>
                <form
                    className={clsx({"hidden": !session})}
                    action={async () => {
                        'use server';
                        await signOut();
                    }}
                >
                    <Button className={`${buttonVariants({ variant: "outline" })} mr-12 bg-white text-black`}>Sign out</Button>
                </form>
                <div className={clsx({"hidden": session})}>
                    <Link href="/login" className="mr-4 text-white">Log In</Link>
                    <Link href="/signup" className={`${buttonVariants({ variant: "outline" })} mr-12 bg-white text-black`}>Sign Up</Link>
                </div>
            </div>
            <div className="h-20"></div>
        </>
    )
}