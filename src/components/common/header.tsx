import Link from "next/link";

import { db } from "@/src/db";

import { Cart } from "./cart";
import Logo from "./logo";
import { MenuNavigation } from "./menu-mobile-navigation";
import { NavbarAboutButton } from "./navbar-about-button";
import { NavbarCategoriesDropdown } from "./navbar-categories-dropdown";
import { NavbarUserMenu } from "./navbar-user-menu";

export const Header = async () => {
  const categories = await db.query.categoryTable.findMany();

  return (
    <>
      <header className="border-border bg-background sticky top-0 z-50 w-full shadow-sm">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Logo />

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Cart />

            {/* User menu monile*/}
            <div className="block lg:hidden">
              <MenuNavigation />
            </div>

            {/* User menu desktop*/}
            <div className="hidden lg:block">
              <NavbarUserMenu />
            </div>
          </div>
        </div>

        {/* Bottom bar com categorias */}
        <div className="border-border bg-muted/30 hidden border-t lg:block">
          <nav className="flex items-center justify-start gap-8 px-6 py-3">
            <Link
              href="/"
              className="text-foreground hover:text-primary text-sm font-medium transition-colors"
            >
              Início
            </Link>

            {/* Categories dropdown */}
            <NavbarCategoriesDropdown categories={categories} />

            <Link
              href="/my-orders"
              className="text-foreground hover:text-primary text-sm font-medium transition-colors"
            >
              Meus Pedidos
            </Link>

            <NavbarAboutButton />
          </nav>
        </div>
      </header>
    </>
  );
};
