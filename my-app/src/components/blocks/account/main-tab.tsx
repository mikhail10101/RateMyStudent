import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { auth } from '../../../../auth'
import { fetchUserByEmail } from '@/lib/data'
import ProfileTab from './profile-tab'
import SettingsTab from './settings-tab'

export default async function MainTab() {
    const session = await auth()

    const { username, email } = await fetchUserByEmail(session?.user?.email || "")

    return (
        <>
            <Tabs defaultValue="account" className="">

                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="ratings">Ratings</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                    <ProfileTab username={username} email={email} />
                </TabsContent>
                <TabsContent value="settings">
                    <SettingsTab />
                </TabsContent>
                <TabsContent value="ratings">Ratings</TabsContent>
            </Tabs>
        </>
    )
}