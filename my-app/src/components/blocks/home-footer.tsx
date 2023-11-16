import Image from "next/image"

export default function HomeFooter() {
    return (
        <div className="bg-black w-screen h-20 flex flex-row mt-[10rem] items-center">
            <div className="text-white ml-8 mr-auto">
                <p>All rights reserved.</p>
                <p>2023</p>
            </div>
            <div>
                <p className="text-white mr-12">Project by Mikhail Borbe</p>
            </div>
        </div>
    )
}