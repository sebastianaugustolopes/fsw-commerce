"use client";

import { ChevronDown, LogIn, LogOut, ShoppingBag } from "lucide-react";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

export const NavbarUserMenu = () => {
  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  if (session?.user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-10 items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={session?.user?.image as string} />
              <AvatarFallback className="bg-black text-sm font-semibold text-white">
                {session?.user?.name?.split(" ")?.[0]?.[0]}
                {session?.user?.name?.split(" ")?.[1]?.[0]}
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-2">
            <p className="text-foreground text-sm font-semibold">
              {session?.user?.name}
            </p>
            <p className="text-muted-foreground text-xs">
              {session?.user?.email}
            </p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href="/my-orders"
              className="flex cursor-pointer items-center gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              Meus Pedidos
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleSignOut}
            className="text-destructive flex cursor-pointer items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button asChild size="sm">
      <Link href="/authentication" className="flex items-center gap-2">
        <LogIn className="h-4 w-4" />
        Entrar
      </Link>
    </Button>
  );
};
