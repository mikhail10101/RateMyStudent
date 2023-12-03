'use client';

import Link from "next/link";

import CommentCard from "../student/comment-card";
import { Rating } from "@/lib/definitions"
import { Button } from "@/components/ui/button"
import clsx from "clsx";

import { useState } from "react";

export default function RatingSegment({ ratings }: { ratings: Rating[] }) {
    const [displayed, setDisplayed] = useState(Math.min(4,ratings.length))
    const add = 2

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
                    const rating = ratings[n]


                    return (
                        <Link href={`/edit/rating/${rating.id}`} key={n}>
                            < CommentCard rat={ratings[n]} />
                        </Link>
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