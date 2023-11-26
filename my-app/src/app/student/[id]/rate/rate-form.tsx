'use client';

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from "zod"

import Link from 'next/link'

import { black_poppins } from '@/lib/fonts'

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
import { Slider } from '@/components/ui/slider';

import { usePathname } from "next/navigation"

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
            number().gte(0).lte(10),
        noise: z.
            number().gte(0).lte(5),
        classroom_title: z.
            string().min(1).max(30),
        classroom_level: z.
            string().min(1).max(30),
        attendance: z.
            string().min(0).max(3).refine((val) => check(val), {message: "Attendance must be a whole number percentage from 0% to 100%"}),
        grade: z.
            string().min(1).max(20),
        comment: z.
            string().min(10).max(1000)
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
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field: {value, onChange} }) => (
                        <FormItem>
                            <FormLabel>Quality - {value}</FormLabel>
                            <FormControl>
                                <Slider onValueChange={(vals) => {
                                    onChange(vals[0])
                                }} defaultValue={[value]} max={10} step={1}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="noise"
                    render={({ field: {value, onChange} }) => (
                        <FormItem>
                            <FormLabel>Noise - {value}</FormLabel>
                            <FormControl>
                                <Slider onValueChange={(vals) => {
                                    onChange(vals[0])
                                }}  defaultValue={[value]} max={5} step={1}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="classroom_title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Class title</FormLabel>
                            <FormControl>
                                <Input {...field} />
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
                            <FormLabel>Class level</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="attendance"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Attendance</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="grade"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Grade</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Comment</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}