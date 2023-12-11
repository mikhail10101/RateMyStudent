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
import { CheckPassword } from '@/lib/actions';

export default function RecoverForm() {
    const [message, dispatch] = useFormState(CheckPassword, undefined)

    var errorMessage
    if (message === undefined) {
        errorMessage = undefined
    } else if (message === "Not Found") {
        errorMessage = "Email not found"
    } else if (message === "Error") {
        errorMessage = "Email not found"
    } else {
        errorMessage = "Password sent to your email!"
    }

    const formSchema = z.object({
        email: z
            .string()
            .email()
            .min(1)
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ""
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {

        const formData = new FormData()
        formData.append("email", values.email)
        dispatch(formData)
    }

    return (
        <div className="bg-white w-[35rem] h-[39rem] flex flex-col items-center justify-evenly">
            <p className={`${black_poppins.className} mt-8 text-5xl`}>Recover Password</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-8/12 space-y-3'>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Enter email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div></div>
                    <SubmitButton />
                </form>
                <div
                    className={clsx({"flex h-8 items-end space-x-1": true},{"hidden": !(errorMessage)})}
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {errorMessage && (
                        <>
                            <p className={clsx(
                                {"text-sm text-red-500": true},
                                {"text-blue-500": errorMessage === "Password sent to your email!"}
                            )}
                            >{errorMessage}</p>
                        </>
                    )}
                </div>
            </Form>
            <div className="w-8/12 flex flex-col h-[10rem] justify-evenly items-center mb-8">
                <p className="text-center text-sm">Rate My Students is designed and target to all audiences and is governed and operated in accordance to US and Philippine Law.</p>
                <span className="text-xs">Don't have an account yet? <Link href="/signup" className="text-blue-600 font-bold">Sign up!</Link></span>
            </div>
        </div>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" className="w-full rounded-3xl" aria-disabled={pending}>
            Continue
        </Button>
    )
}