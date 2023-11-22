import { fetchStudents, fetchInvoicesPages } from "@/lib/data"
import SearchNavigation from "@/components/blocks/search/search-navigation"
import Results from "@/components/blocks/search/results"
import Pagination from "@/components/blocks/search/pagination"
import HomeFooter from "@/components/blocks/homepage/home-footer"

export default async function Page({ searchParams }: {
    searchParams?: {
        query?: string
        page?: string
    }
}) {
    const query = searchParams?.query || ''
    const currentPage = Number(searchParams?.page) || 1
    const totalPages = await fetchInvoicesPages(query)

    return (
        <div className="flex flex-col items-center">
            <SearchNavigation />
            <div className="min-h-[80%]">
                <div className="w-[46rem] mt-20">
                    <Results query={query} currentPage={currentPage}/>
                </div>
                <div className="my-10">
                    <Pagination totalPages={totalPages}/>
                </div>
            </div>
            <div className="w-full">
                <HomeFooter/>
            </div>
        </div>
    )
}