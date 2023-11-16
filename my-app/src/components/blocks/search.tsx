'use client';

export default function Search({ placeholder }: { placeholder: string }) {
    function HandleSearch(term: string) {
        console.log(term);
    }

    return (
        <div>
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="block rounded-3xl text-xl outline-0 placeholder:text-gray-500 h-[3.5rem] min-[670px]:w-[30rem] min-[670px]:text-left w-[20rem] text-center min-[670px]:pl-10"
                placeholder={placeholder}
                onChange={(e) => {
                    HandleSearch(e.target.value);
                }}
            />
        </div>
    )
}