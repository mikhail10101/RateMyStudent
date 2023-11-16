import Image from "next/image"

export default function HomeFooter() {
    return (
        <div className="bg-black w-screen h-20 flex flex-row mt-[10rem] items-center">
            <div className="flex-shrink basis-1/12"></div>
            <div className="text-white text-left  basis-5/12">
                <p>All rights reserved. 2023.</p>
            </div>
            <div className="basis-5/12">
                <p className="text-white text-right">Project by Mikhail Borbe</p>
            </div>
            <div className="flex-shrink basis-1/12"></div>
        </div>
    )
}