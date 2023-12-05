import Image from "next/image"
import { useState } from "react"
import { Vote } from "@/lib/actions"

export default function Dislike({amount, solid, rating_id}:{
    amount: number,
    solid: boolean,
    rating_id: string
}) {

    const [fill, setFill] = useState(solid)
    const [num, setNum] = useState(amount)

    const handleClick = () => {
        if (fill) {
            setNum(num-1)
        } else {
            setNum(num+1)
        }
        Vote(rating_id,0)
        setFill(!fill)
    }

    if (fill) {
        return (
            <div className="flex flex-row items-center gap-1">
                <button onClick={handleClick}>
                    <Image
                        src="/thumbs-down-solid.svg"
                        width={20}
                        height={20}
                        alt="thumbs down"
                    />
                </button>
                <p>{num}</p>
            </div>
        )
    }
    return (
        <div className="flex flex-row items-center gap-1">
            <button onClick={handleClick}>
                <Image
                    src="/thumbs-down.svg"
                    width={20}
                    height={20}
                    alt="thumbs down"
                />
            </button>
            <p>{num}</p>
        </div>
    )
}