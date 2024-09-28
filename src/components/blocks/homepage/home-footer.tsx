import Image from "next/image"
import Link from "next/link"

export default function HomeFooter() {
    return (
        <div className="bg-black h-20 flex flex-row mt-[10rem] items-center">
            <div className="flex-shrink basis-1/12"></div>
            <div className="flex flex-row items-center text-white text-left basis-6/12">
                <Link href="/">
                    <Image
                        src="/logo_shortened.png"
                        width={100}
                        height={100}
                        alt="logo"
                    />
                </Link>
                <p>All rights reserved</p>
            </div>
            <div className="basis-5/12">
                <p className="text-white text-right">Project by Mikhail Borbe</p>
            </div>
            <div className="flex-shrink basis-1/12"></div>
        </div>
    )
}