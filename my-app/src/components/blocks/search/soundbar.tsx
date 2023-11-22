function Bar({color}: {color: string}) {
    return (
        <div className={`h-2 w-10 ${color}`}>
        </div>
    )
}

export default function SoundBar({noise}: {noise: number}) {
    switch(noise) {
        case 0:
            return (
                <div className="flex flex-col space-y-1">
                    <Bar color="bg-slate-300"/>
                    <Bar color="bg-slate-300"/>
                    <Bar color="bg-slate-300"/>
                    <Bar color="bg-slate-300"/>
                    <Bar color="bg-slate-300"/>
                </div>
            )
        case 1:
            return (
                <div className="flex flex-col space-y-1">
                    <Bar color="bg-slate-300"/>
                    <Bar color="bg-slate-300"/>
                    <Bar color="bg-slate-300"/>
                    <Bar color="bg-slate-300"/>
                    <Bar color="bg-green-200"/>
                </div>
            )
        case 2:
            return (
                <div className="flex flex-col space-y-1">
                    <Bar color="bg-slate-300"/>
                    <Bar color="bg-slate-300"/>
                    <Bar color="bg-slate-300"/>
                    <Bar color="bg-green-300"/>
                    <Bar color="bg-green-200"/>
                </div>
            )
        case 3:
            return (
                <div className="flex flex-col space-y-1">
                    <Bar color="bg-slate-300"/>
                    <Bar color="bg-slate-300"/>
                    <Bar color="bg-green-400"/>
                    <Bar color="bg-green-300"/>
                    <Bar color="bg-green-200"/>
                </div>
            )
        case 4:
            return (
                <div className="flex flex-col space-y-1">
                    <Bar color="bg-slate-300"/>
                    <Bar color="bg-green-500"/>
                    <Bar color="bg-green-400"/>
                    <Bar color="bg-green-300"/>
                    <Bar color="bg-green-200"/>
                </div>
            )
        case 5:
            return (
                <div className="flex flex-col space-y-1">
                    <Bar color="bg-green-600"/>
                    <Bar color="bg-green-500"/>
                    <Bar color="bg-green-400"/>
                    <Bar color="bg-green-300"/>
                    <Bar color="bg-green-200"/>
                </div>
            )
    }
}