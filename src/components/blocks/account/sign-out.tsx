import { black_poppins } from "@/lib/fonts";
import { Button, buttonVariants } from "@/components/ui/button";
import { signOut } from "../../../auth";

export default function SignOut() {
    return (
        <div className="flex flex-col items-center">
            <form
                action={async () => {
                    'use server';
                    await signOut();
                }}
            >
                <Button className={`${buttonVariants({ variant: "outline" })} bg-black text-white ${black_poppins.className}`}>Sign out</Button>
            </form>
        </div>
    )
}