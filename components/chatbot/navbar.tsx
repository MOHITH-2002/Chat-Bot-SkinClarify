import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

import { LogoutButton } from "./logout";


const Navbar =  () => {
        
    return(
        <div className="flex justify-between w-full">

        <div className="flex items-center space-x-2">
            <Link href="/">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/logo.png" alt="Skin Clarify" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            </Link>
            <span className="font-bold text-2xl">Skin Clarify</span>
          </div>
          <div>

          <LogoutButton/>
          </div>
        </div>
    )
};

export default Navbar;
