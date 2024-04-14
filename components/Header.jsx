import Link from "next/link";
import Image from "next/image";
import React from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { Button } from "./ui/button";

import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

const Header = () => {
    return (
        <header className="w-full border-b">
            <div className="container flex items-center justify-between">
                <Link href="/" className="w-36">
                    <Image
                        src="/images/navlogo.svg"
                        alt="Evently logo"
                        width={144}
                        height={40}
                    />
                </Link>

                <SignedIn>
                    <nav className="md:flex-between hidden w-full max-w-xs">
                        <NavItems />
                    </nav>
                </SignedIn>

                <div className="flex w-32 justify-end gap-3">
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                        <MobileNav />
                    </SignedIn>

                    <SignedOut>
                        <Button asChild className=" rounded-full" size="lg"  >
                            <Link href="/sign-in" >Login</Link>
                        </Button>
                    </SignedOut>
                </div>
            </div>
        </header>
    );
};

export default Header;

//  component inside <SignedOut> will be displayed only when user is signedout
//  component inside <SignedIn> will be displayed only when user is signedin
