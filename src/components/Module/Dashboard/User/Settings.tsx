"use client"

import { logoutUser } from "@/actions/Auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { LogOut, Trash2,  } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Settings() {
  const router = useRouter();

  const [profileData, setProfileData] = useState(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

    const handleLogout = async () => {
      try {
        await logoutUser();
        setProfileData(null);
        router.push("/login");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };
  
    console.log(profileData)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <motion.div className="grid gap-6" variants={container} initial="hidden" animate="show">

        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription> Your account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Button onClick={handleLogout} variant="outline" className="text-white bg-gradient-to-r from-navy-blue to-teal-500 hover:from-teal-500 hover:to-navy-blue hover:text-white">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                  <Button onClick={handleLogout}  variant="outline" className="text-white bg-gradient-to-r from-navy-blue to-teal-500 hover:from-teal-500 hover:to-navy-blue hover:text-white">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
