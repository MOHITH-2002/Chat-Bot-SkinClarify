'use client';

import { logout } from "@/lib/actions/logout";
import {
  DropdownMenu,

  DropdownMenuContent,

  DropdownMenuItem,

  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaUser } from "react-icons/fa";
import { Button } from "../ui/button";
import { ExitIcon } from "@radix-ui/react-icons";



export const LogoutButton = () => {
  const onClick = () => {
    logout();
  };
  return (

    <div className="cursor-pointer">

        <DropdownMenu>

      <DropdownMenuTrigger asChild>
  
            
            
            <Button  size="icon" className="rounded-full" variant="outline">

        <FaUser />
        </Button>
          
        
        
        </DropdownMenuTrigger>
       <DropdownMenuContent className="w-40 flex flex-col gap-2" align="end">
            
         
          {/* logout */}
        
          <DropdownMenuItem className="cursor-pointer" onClick={onClick}>
            <ExitIcon className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  );
};