"use client";

import { logoutUser } from "@/actions/Auth";
import { myProfile } from "@/actions/User";
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
import { getActiveUser } from "@/utils/getAvtiveUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfileMenu = () => {
  const user = getActiveUser();
  const router = useRouter();

  const [profileData, setProfileData] = useState<TUser | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchProfile = async () => {
      if (!user?.userEmail) return;

      try {
        const res = await myProfile();
        setProfileData(res?.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    if (user?.userEmail) setIsLoading(true);
    else setIsLoading(false);

    fetchProfile();
  }, [user?.userEmail]);

  if (isLoading) {
    return (
      <Skeleton className="h-10 w-40 flex items-center justify-center rounded-full">
        <div className="h-10 w-10 rounded-full bg-gray-300 animate-pulse" />
        <div className="ml-3 h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
      </Skeleton>
    );
  }

  const logOut = async () => {
    try {
      await logoutUser();
      setProfileData(null);
        router.push("/login");
    } catch (error: unknown) {
      console.log(error);
    }
  };


  return (
    <div>
      {profileData ? (
        <div className="flex items-center gap-1 md:gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="w-10 h-10">
                <AvatarImage src={"/images/avatar"} alt={profileData?.name} />
                <AvatarFallback className="cursor-pointer">
                  {profileData?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link className="cursor-pointer" href="/dashboard">
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Button
                  className="cursor-pointer"
                  variant="ghost"
                  onClick={logOut}
                >
                  Logout
                  <span className="sr-only">Logout</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Link href="/login">
          <Button className="text-white bg-gradient-to-r from-navy-blue to-teal-500 hover:from-teal-500 hover:to-navy-blue">
            Sign In
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ProfileMenu;
