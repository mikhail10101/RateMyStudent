import Image from 'next/image'
import Link from 'next/link';
import { black_poppins } from '@/lib/fonts'
import { buttonVariants } from '../ui/button'


export default function HomeInfo() {
    return (
        <div className={"mt-[20rem] flex flex-col items-center"}>

            <p className={`${black_poppins.className} min-[670px]:text-6xl text-4xl`}>Join the RMS Family</p>

            <p className="text-xl">Love RMS? Let's make it official.</p>

            <div className="w-screen flex flex-row justify-evenly mt-20 min-[600px]:flex-nowrap flex-wrap">
                <div className="flex flex-col items-center min-[600px]:ml-20">
                    <Image
                        src="/writing.png"
                        height={300}
                        width={300}
                        alt="Writing clipart"
                    />
                    <p className="w-[280px] text-center font-black text-[30px]">Manage and edit your comments</p>
                </div>
                <div className="flex flex-col items-center">
                    <Image
                        src="/whispering.png"
                        height={300}
                        width={300}
                        alt="Whispering clipart"
                    />
                    <p className="w-[280px] text-center font-black text-[30px]">Maintain your privacy</p>
                </div>
                <div className="flex flex-col items-center min-[600px]:mr-20">
                    <Image
                        src="/highscore.png"
                        height={300}
                        width={300}
                        alt="Highscore clipart"
                    />
                    <p className="w-[280px] text-center font-black text-[30px]">Give scores to people you meet</p>
                </div>
            </div>

            <Link className={`${buttonVariants({ variant: "outline" })} mr-12 bg-black text-white rounded-3xl my-12 mx-10 w-48 font-bold`} href="/login">
                    Sign up now!
            </Link>
        </div>
    )
}