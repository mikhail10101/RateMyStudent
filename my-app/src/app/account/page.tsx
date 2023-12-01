import HomeNav from "@/components/blocks/homepage/home-navigation";
import HomeFooter from "@/components/blocks/homepage/home-footer";
import MainTab from "@/components/blocks/account/main-tab";

export default function Page() {
    return (
        <>
            <HomeNav />
            <div className="flex flex-col items-center">
                <div className="max-w-[80%] w-[60rem]">
                    <MainTab />
                </div>
            </div>
            <HomeFooter />
        </>
    )
}