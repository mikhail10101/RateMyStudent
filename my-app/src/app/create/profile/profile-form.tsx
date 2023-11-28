'use client';

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { CalendarIcon } from "lucide-react"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

import { Calendar } from '@/components/ui/calendar';

import { Student } from '@/lib/definitions';
import { CreateStudent } from '@/lib/actions';

import { black_poppins } from '@/lib/fonts'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

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

export default function ProfileForm() {

    //missing: student_id, commenter_id, date
    //generate: id
    const formSchema = z.object({
        firstname: z.string().
            min(1,{message:"Must enter a first name"}).
            max(20,{message:"Entered name is too long"}),
        lastname: z.string().
            min(1,{message:"Must enter a last name"}).
            max(20,{message:"Entered name is too long"}),
        birthday: z.date(),
        email: z.string().
            min(1,{message:"Must enter an email"}).
            email({message:"Must enter a valid email"}),
        school: z.string().
            min(1,{message:"Must enter a school"}).
            max(100,{message:"School name is too long"}),
        major: z.string().
            min(1,{message:"Must enter a major"}).
            max(100,{message:"Major name is too long"})
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            birthday: new Date(),
            email: "",
            school: "",
            major: ""
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const { firstname, lastname, school, major, email, birthday } = values

        const pass: Student = {
            id: "",
            firstname: firstname,
            lastname: lastname,
            birthday: birthday,
            email: email,
            school: school,
            major: major,
            rating: 0,
            amount: 0,
            noise: 0
        }

        CreateStudent(pass)
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10 mt-10">
                    <div className="flex flex-col bg-zinc-100 p-5 justify-center shadow-lg">
                        <p className={`${black_poppins.className} text-xl`}>Name</p>
                        <div className="columns-2">
                            <FormField
                                control={form.control}
                                name="firstname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder='First name' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lastname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder='Last name' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center bg-zinc-100 p-5 shadow-lg">
                    <p className={`${black_poppins.className} text-xl`}>Study</p>
                        <div className="columns-2">
                            <FormField
                                control={form.control}
                                name="school"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder='Enter student school' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="major"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder='Enter student major' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="p-5 bg-zinc-100 columns-2 shadow-lg gap">
                        <div className="">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={`${black_poppins.className} text-xl`}>Email</FormLabel>
                                        <div>
                                            <FormControl>
                                                <Input placeholder='Enter student email' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="">
                            <FormField
                                control={form.control}
                                name="birthday"
                                render={({ field }) => (
                                    <FormItem className='flex flex-col'>
                                        <FormLabel className={`${black_poppins.className} text-xl`}>Birthday</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <div className="flex flex-col items-center">
                                                        <Button
                                                            type="button"
                                                            variant={"outline"}
                                                            className={cn("justify-start text-left font-normal w-4/5", !field.value && "text-muted-foreground")}
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            <p className="truncate">{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}</p>
                                                        </Button>
                                                    </div>
                                                </PopoverTrigger>
                                                <PopoverContent align="start" className=" w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        captionLayout="dropdown-buttons"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        fromYear={1960}
                                                        toYear={2030}
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center mt-10">
                        <Button type="submit" className={`bg-blue-400 text-xl ${black_poppins.className} font-bold w-[10rem] rounded-xl`}>Submit</Button>
                    </div>
                </form>
            </Form>
        </>
    )
}