import HomeAccNav from "@/components/blocks/account/home-acc-nav";
import HomeFooter from "@/components/blocks/homepage/home-footer";

import AccountNav from "@/components/blocks/account/account-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="shadow-xl">
                <HomeAccNav />   
            </div>
                
            <div className="flex flex-col items-center">
                <div className="w-[46rem] max-w-[80%] mt-20 min-h-screen">
                    <AccountNav /> 
                    <div className="p-10 pt-16">
                        {children}
                    </div>
                </div>
            </div>
            <HomeFooter />
        </>
    )
}