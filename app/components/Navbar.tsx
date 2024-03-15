import React from "react";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
    return (
        <nav className="sticky top-0 flex justify-between items-center py-4 h-[10vh] shadow dark:shadow-neutral-800 px-6 md:px-10 lg:px-20">
            <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                Saket&apos;s Blog
            </p>
            <div>
                <ModeToggle />
            </div>
        </nav>
    );
};

export default Navbar;
