import Image from 'next/image'
import Search from './search'

export default function HomeImage() {
    return (
        <div className="flex flex-col items-center bg-[url('/students_dark.jpg')] bg-center bg-cover h-[40rem]">
            <Image
                src="/logo_transparent.png"
                height={100}
                width={500}
                alt="logo"
            />
            <p className="text-white min-[670px]:text-5xl mb-auto text-2xl">Enter a <b>name</b> to get started!</p>
            <Search placeholder="Interested in anyone?"/>
            <p className="mt-10 mb-28 font-bold text-white text-xs">Can't find who you're looking for? Make them a profile!</p>
        </div>
    )
}