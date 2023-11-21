import { fetchStudents } from "@/lib/data"
import SearchNavigation from "@/components/blocks/search/search-navigation"
import Pagination from "@/components/blocks/search/pagination"

export default function Page() {
    return (
        <div className="flex flex-col items-center">
            <SearchNavigation />
            <div className="w-10/12">
            <   Pagination />
            </div>
        </div>
    )
}