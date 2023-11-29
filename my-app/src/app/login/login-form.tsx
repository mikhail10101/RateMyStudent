'use client';

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

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from "zod"

import clsx from 'clsx';

import Link from 'next/link'
import { black_poppins } from '@/lib/fonts'

import { useFormState, useFormStatus } from 'react-dom'
import { authenticate } from '@/lib/actions';

export default function LoginForm() {
    const [state, dispatch] = useFormState(authenticate, undefined)

    const formSchema = z.object({
        username: z.
            string().
            min(1, { message: "Must enter a username" }),
        password: z.
            string().
            min(1, { message: "Must enter a password" })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)

        const formData = new FormData()
        formData.append("username", values.username)
        formData.append("password", values.password)
        dispatch(formData)
    }

    return (
        <div className="bg-white w-[35rem] h-[39rem] flex flex-col items-center justify-evenly">
            <p className={`${black_poppins.className} mt-8 text-5xl`}>Log In</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-8/12 space-y-3'>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter username" {...field} />
                                </FormControl>
                                <FormMessage />
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
                                    <Input placeholder="Enter password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div></div>
                    <LoginButton />
                </form>
                <div
                    className={clsx({"flex h-8 items-end space-x-1": true},{"hidden": !(state === 'CredentialsSignin')})}
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {state === 'CredentialsSignin' && (
                        <>
                            <p className="text-sm text-red-500">Invalid credentials</p>
                        </>
                    )}
                </div>
            </Form>
            <div className="w-8/12 flex flex-col h-[10rem] justify-evenly items-center mb-8">
                <p className="text-center text-sm">Rate My Students is designed and target to all audiences and is governed and operated in accordance to US and Philippine Law.</p>
                <button className="text-[1rem] text-blue-600 font-bold">Forgot password?</button>
                <span className="text-xs">Don't have an account yet? <Link href="/signup" className="text-blue-600 font-bold">Sign up!</Link></span>
            </div>
        </div>
    )
}

function LoginButton() {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" className="w-full rounded-3xl" aria-disabled={pending}>Continue</Button>
    )
}