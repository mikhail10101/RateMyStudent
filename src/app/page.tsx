import HomeNav from "@/components/blocks/homepage/home-navigation"
import HomeImage from "@/components/blocks/homepage/home-image"
import HomeInfo from "@/components/blocks/homepage/home-info"
import HomeFooter from "@/components/blocks/homepage/home-footer"
import '@/lib/hide-overflow.css'

export default function Home() {
  return (
    <div className="">
      <HomeNav />
      <HomeImage />
      <HomeInfo />
      <HomeFooter />
    </div>
  )
}