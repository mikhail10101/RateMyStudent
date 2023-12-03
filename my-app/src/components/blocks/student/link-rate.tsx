'use client';

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { black_poppins } from "@/lib/fonts"

export default function LinkRate() {
    const path = usePathname()
    return (
        <Link href={`${path}/rate`}>
            <Button className={`${black_poppins.className} text-[1rem] bg-blue-600 rounded-2xl w-32 my-10 hover:bg-zinc-300 hover:text-black`}>
                {'Rate'}
            </Button>
        </Link>
    )
}