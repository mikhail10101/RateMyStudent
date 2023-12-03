'use client';

import { ChangePassword } from "@/lib/actions";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
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

import { useState } from "react";
import { useFormStatus } from 'react-dom'

import clsx from "clsx";


export default function SettingsTab() {
    const [error, setError] = useState(false)

    const formSchema = z.object({
        current: z.string(),
        new: z.string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            current: "",
            new: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!(await ChangePassword(values.current,values.new))) {
            console.log("Error")
            setError(true)
        } else {
            setError(false)
            form.reset()
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="current"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current password</FormLabel>
                            <FormControl>
                                <Input placeholder="Current password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="new"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New password</FormLabel>
                            <FormControl>
                                <Input placeholder="New password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                < LoginButton />
                <div className={clsx({"text-sm text-red-500": true},{"hidden": !error})}>
                    <p>Wrong password</p>
                </div>
            </form>
        </Form>
    )
}

function LoginButton() {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" className="w-full rounded-3xl" aria-disabled={pending}>
            Submit
        </Button>
    )
}