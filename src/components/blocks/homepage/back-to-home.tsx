import Image from "next/image";
import Link from "next/link";

export default function BackHome() {
    return (
        <Link href="/">
            <Image
                src="/house-solid.svg"
                width={30}
                height={30}
                alt="Home"
                className="m-5 fixed x-0 y-0"
            />
        </Link>
    )
}