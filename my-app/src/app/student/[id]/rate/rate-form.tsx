'use client';

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from "zod"

import { Rating } from '@/lib/definitions';

import { black_poppins } from '@/lib/fonts'

import { CreateRating } from '@/lib/actions';

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea';

import { usePathname } from "next/navigation"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup
  } from "@/components/ui/select"

export default function RateForm() {
    const pathname = usePathname()
    const student_id = pathname.split("/")[2]

    const check = (word: string) => {
        return 0 <= +word && +word <= 100 && word.split('.').length == 1
    }

    //missing: student_id, commenter_id, date
    //generate: id
    const formSchema = z.object({
        rating: z.
            number().
            gte(0).
            lte(100),
        noise: z.
            number().
            gte(0).
            lte(100),
        classroom_title: z.
            string().
            min(1,{message:"Must enter a class title"}).
            max(30,{message:"Class title is too long"}),
        classroom_level: z.
            string().
            min(1,{message:"Must enter a class title"}).
            max(30,{message:"Class level is too long"}),
        attendance: z.
            string().
            min(0,{message:"Must enter attendance"}).
            max(3,{message:"Attendance must be a whole number percentage from 0 to 100"}).
            refine((val) => check(val), {message: "Attendance must be a whole number percentage from 0% to 100%"}),
        grade: z.
            string().
            min(1).
            max(20),
        comment: z.
            string().
            min(10, {message:"Comment is too short"}).
            max(1000, {message: "Comment is too long"})
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rating: 0,
            noise: 0,
            classroom_title: "",
            classroom_level: "",
            attendance: "",
            grade: "",
            comment: ""
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        //student_id from above
        const {rating, noise, classroom_title, classroom_level, attendance, grade, comment} = values
        const date = new Date()
        
        const pass: Rating = {
            id: "",
            student_id: student_id,
            commenter_id: "410544b2-4001-4271-9855-fec4b6a6442a",
            rating: Math.trunc(rating/10),
            noise: Math.trunc(noise/20),
            classroom: classroom_title + " " + classroom_level,
            grade: grade,
            attendance: +attendance,
            likes: 0,
            dislikes: 0,
            comment: comment,
            date: date
        }

        CreateRating(pass)
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10 mt-10">
                    <div className="flex flex-col bg-zinc-100 p-5 gap-10 shadow-lg">
                        <FormField
                            control={form.control}
                            name="rating"
                            render={({ field: {value, onChange} }) => (
                                <FormItem>
                                    <FormLabel className={`${black_poppins.className} text-xl`}>Quality</FormLabel>
                                    <div className="flex flex-col items-center">{Math.trunc(value/10)}</div>
                                    <FormControl>
                                        <Slider className="" onValueChange={(vals) => {
                                            onChange(vals[0])
                                        }} defaultValue={[value]} max={100} step={1}/>
                                    </FormControl>
                                    <FormDescription>0 Lowest, 10 Highest</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="noise"
                            render={({ field: {value, onChange} }) => (
                                <FormItem>
                                    <FormLabel className={`${black_poppins.className} text-xl`}>Noise</FormLabel>
                                    <div className="flex flex-col items-center">{Math.trunc(value/20)}</div>
                                    <FormControl>
                                        <Slider onValueChange={(vals) => {
                                            onChange(vals[0])
                                        }}  defaultValue={[value]} max={100} step={1}/>
                                    </FormControl>
                                    <FormDescription>0 Lowest, 5 Highest</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-col bg-zinc-100 p-5 shadow-lg">
                        <p className={`${black_poppins.className} text-xl`}>Classroom</p>
                        <div className="columns-2">               
                            <FormField
                                control={form.control}
                                name="classroom_title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Class Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder='eg. CSS' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="classroom_level"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Class Level</FormLabel>
                                        <FormControl>
                                            <Input placeholder='eg. 143' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="columns-2">
                        <div className="bg-zinc-100 p-5 shadow-lg max-h-[10rem]">
                            <FormField
                                control={form.control}
                                name="attendance"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={`${black_poppins.className} text-xl`}>Attendance</FormLabel>
                                        <FormControl>
                                            <div className="flex flex-row gap-1">
                                                <Input className="w-[5rem] text-center" placeholder='eg. 80' {...field} /><p className="text-3xl">%</p>
                                            </div>         
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="bg-zinc-100 p-5 shadow-lg max-h-[10rem]">
                            <FormField
                                control={form.control}
                                name="grade"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={`${black_poppins.className} text-xl`}>Grade</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder="Select grade" />
                                                </SelectTrigger>
                                                <SelectContent className='text-xl'>
                                                    <SelectGroup>
                                                        <SelectItem value="A+">A+</SelectItem>
                                                        <SelectItem value="A">A</SelectItem>
                                                        <SelectItem value="A-">A-</SelectItem>
                                                        <SelectItem value="B+">B+</SelectItem>
                                                        <SelectItem value="B">B</SelectItem>
                                                        <SelectItem value="B-">B-</SelectItem>
                                                        <SelectItem value="C+">C+</SelectItem>
                                                        <SelectItem value="C">C</SelectItem>
                                                        <SelectItem value="C-">C-</SelectItem>
                                                        <SelectItem value="D+">D+</SelectItem>
                                                        <SelectItem value="D">D</SelectItem>
                                                        <SelectItem value="D-">D-</SelectItem>
                                                        <SelectItem value="F">F</SelectItem>
                                                        <SelectItem value="No Grade">Audit/No Grade</SelectItem>
                                                        <SelectItem value="Drop">Drop/Withdrawal</SelectItem>
                                                        <SelectItem value="Incomplete">Incomplete</SelectItem>
                                                        <SelectItem value="Unsure">Not Sure Yet</SelectItem>
                                                        <SelectItem value="Confidential">Confidential</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="bg-zinc-100 p-5 shadow-lg max-h-[20rem]">
                        <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={`${black_poppins.className} text-xl`}>Comment</FormLabel>
                                    <FormControl>
                                        <Textarea className="h-[10rem]" placeholder="Type your comment here." maxLength={1000} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                        
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </>
    )
}