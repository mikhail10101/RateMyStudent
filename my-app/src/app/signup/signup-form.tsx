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
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from "@/components/ui/input"

export default function SignupForm() {
    const formSchema = z.object({
        email: z.
            string().
            min(1, {message: "Must enter an email"}).
            email({message: "Must enter a valid email"}),
        username: z.
            string().
            min(1, {message: "Must enter a username"}).
            max(15, {message: "Username is too long"}),
        password: z.
            string().
            min(1, {message: "Must enter a password"}).
            min(6, {message: "Password is too short"}).
            max(20, {message: "Password is too long"}),
        password2: z.
            string(),
        remember: z.
            boolean().
            optional(),
        policy:
            z.coerce.
            boolean().
            refine(bool => bool == true, {message: "You must agree to the Terms and Conditions"})
    }).refine((data) => data.password === data.password2, {
        message: "Confirmation password doesn't match",
        path: ["password2"]
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            password2: "",
            remember: false,
            policy: false
        }
    })
    
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <div className="bg-white w-[35rem] h-[49rem] flex flex-col items-center justify-evenly">
            <p className={`${black_poppins.className} mt-12 text-5xl`}>Sign Up</p>
            <Form {...form}>
            <form
            onSubmit={form.handleSubmit(onSubmit)}
        >
        <div className="flex flex-col space-y-3">
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input placeholder="Username" {...field} />
                        </FormControl>
                        <FormMessage className="text-sm"/>
                    </FormItem>
                )}
            />
            
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage className="text-sm"/>
                    </FormItem>
                )}
            />
            
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs"/>
                    </FormItem>
                )}
            />
            
            <FormField
                control={form.control}
                name="password2"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Repeat Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="Re-enter Password" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs"/>
                    </FormItem>
                )}
            />
            </div>
            
            <div className="py-3">
            <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        <FormLabel>
                            {" "}Remember me
                        </FormLabel>
                        <FormMessage className="text-sm"/>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="policy"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        <FormLabel>
                            {" "}I agree with the Terms and Conditions
                        </FormLabel>
                        <FormMessage className="text-sm"/>
                    </FormItem>
                )}
            />
            </div>
            <div className="flex flex-col items-center mt-5">
                <Button type="submit" className="w-full rounded-3xl">Continue</Button>
            </div>
        </form>
            </Form>
            <div className="w-8/12 flex flex-col h-[7rem] justify-evenly items-center mb-8">
                <p className="text-center text-sm">Rate My Students is designed and target to all audiences and is governed and operated in accordance to US and Philippine Law.</p>
                <div className="text-xs flex flex-row space-x-1"><p>Already have an account?</p><Link href="/login" className="text-blue-600 font-bold">Log in</Link></div>
            </div>
        </div>
    )   
}