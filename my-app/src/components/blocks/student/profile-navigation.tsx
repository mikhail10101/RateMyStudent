import Search from "../homepage/search";
import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "../../../../auth";

export default async function ProfileNavigation() {
    const session = await auth()

    return (
        <>
            <div className="z-10 bg-black fixed w-full flex flex-row items-center h-16">
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
                    <div className="mt-[1.49rem]">
                        <Search placeholder={"Enter name"} tailwind="block rounded-3xl text-base outline-0 placeholder:text-gray-500 h-[2.5rem] w-[20rem] text-left pl-3"/>
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