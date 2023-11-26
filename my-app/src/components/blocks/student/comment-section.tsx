import CommentSegment from "./comment-segment"

export default function CommentSection({id}:{id: string}) {
    const arr = [{n: 0},{n: 1},{n: 2}]
    return (
        <div className="flex flex-col max-w-[80%] w-[60rem] gap-8">
            {
                arr.map((element) => {
                    return (
                        <div key={element.n}>
                            < CommentSegment id={id} page_offset={element.n} />
                        </div>
                    )
                })
            }
        </div>
    )
}