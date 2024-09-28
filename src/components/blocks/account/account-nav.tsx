'use client';

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

import { useRouter } from 'next/navigation'

export default function AccountNav() {
    const pathname = usePathname()
    const router = useRouter()

    const arr = [
        {small: "profile", caps: "Profile"},
        {small: "settings", caps: "Settings"},
        {small: "ratings", caps: "Ratings"}
    ]

    return (
        <div className="flex flex-row">
            {
                arr.map((tab) => {
                    return (
                        <Button onClick={() => router.replace(`/account/${tab.small}`)} key={tab.small} className={clsx(
                            "text-black flex h-[40px] items-center justify-center gap-2 bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                            {
                              'bg-sky-100 text-blue-600': pathname.endsWith(tab.small),
                            }
                            )}>
                                {tab.caps}
                        </Button>
                    )
                })
            }
        </div>
    )
}