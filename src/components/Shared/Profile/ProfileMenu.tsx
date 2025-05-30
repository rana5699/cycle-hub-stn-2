"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { logoutUser } from "@/actions/Auth";
import { myProfile } from "@/actions/User";
import { getActiveUser } from "@/utils/getAvtiveUser";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

import { TUser } from "@/types/user.types";

const ProfileMenu = () => {
  const router = useRouter();
  const user = getActiveUser(); // localStorage or cookie-based

  const [profileData, setProfileData] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.userEmail) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await myProfile();

        setProfileData(res?.data || null);

        setIsLoading(false);
      } catch (error) {
        setProfileData(null);
        setIsLoading(false);
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, [user?.userEmail]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setProfileData(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-4 w-24 rounded" />
      </div>
    );
  }

  if (!profileData) {
    return (
      <Link href="/login">
        <Button className="text-white bg-gradient-to-r from-navy-blue to-teal-500 hover:from-teal-500 hover:to-navy-blue">
          Sign In
        </Button>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-1 md:gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="w-10 h-10 cursor-pointer">
            <AvatarImage
              src={"/images/avatar"}
              alt={profileData?.name || "User"}
            />
            <AvatarFallback>
              {profileData?.name?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              className="cursor-pointer"
              href={
                user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user"
              }
            >
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Button
              variant="ghost"
              className="w-full text-left"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileMenu;
