'use client';

import CommentCard from "./comment-card"
import { Rating } from "@/lib/definitions"
import { Button } from "@/components/ui/button"
import clsx from "clsx";

import { useState } from "react";

export default function CommentSegment({ ratings }: { ratings: Rating[] }) {
    const [displayed, setDisplayed] = useState(Math.min(2,ratings.length))
    const add = 1

    const arr = []
    for (let i = 0; i < displayed; i++) {
        arr.push(i)
    }

    const handleClick = () => {
        if (displayed+add > ratings.length) {
            setDisplayed(ratings.length)
        } else {
            setDisplayed(displayed+add)
        }
    }

    return (
        <div className="flex flex-col gap-12">
            {
                arr.map((n) => {
                    return (
                        <div key={n}>
                            < CommentCard rat={ratings[n]} />
                        </div>
                    )
                })
            }
            <div className="flex flex-col items-center">
                <Button onClick={handleClick}
                    className={clsx({"hidden": displayed == ratings.length},
                    {"w-[14rem] h-[3rem] rounded-3xl text-base font-semibold mt-10": true})}
                >Load more ratings</Button>
            </div>
        </div>
    )
}