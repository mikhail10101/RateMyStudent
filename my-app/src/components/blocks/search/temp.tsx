'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export default function Temp() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', '1')
        if (term) {
            params.set('query', term)
        } else {
            params.delete('query')
        }
        replace(`${pathname}?${params.toString()}`)
    }, 300)

    return (
        <>
            <input
                className="block rounded-3xl text-base outline-0 placeholder:text-gray-500 h-[2.5rem] w-[20rem] text-left pl-3"
                placeholder="Enter name"
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('query')?.toString()}
            />

        </>
    )
}