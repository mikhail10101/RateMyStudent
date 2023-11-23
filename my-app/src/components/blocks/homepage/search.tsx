'use client';

import { useSearchParams, redirect, useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
  } from "@/components/ui/form"

const formSchema = z.object({
    searched: z.string()
})

export default function Search({ placeholder }: { placeholder: string }) {
    const { push } = useRouter()
    const searchParams = useSearchParams()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searched: ""
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const term = values.searched

        const params = new URLSearchParams(searchParams)
        params.set('page','1')
        if (term) {
            params.set('query',term)
        } else {
            params.delete('query')
        }
        push(`/search?page=1&query=${term}`)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="searched"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <input
                                    id="searched"
                                    className="block rounded-3xl text-xl outline-0 placeholder:text-gray-500 h-[3.5rem] min-[670px]:w-[30rem] min-[670px]:text-left w-[20rem] text-center min-[670px]:pl-7"
                                    placeholder={placeholder}
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <button type="submit"></button>
            </form>
        </Form>



        
    )
}