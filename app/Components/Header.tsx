import { ModeToggle } from "../mode-toggle";
import { SiMarketo } from "react-icons/si";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";


export function Header() {
    return (
      <nav className="flex h-[73px] items-center justify-between px-6">
        <Logo />
        <div className="flex items-center justify-between gap-4 w-[30%]">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-primary" />
            <Input
              type="search"
              placeholder="Search a coin..."
              className="pl-8 border-none shadow-none w-[300px]"
            />
          </div>
          <ModeToggle />
        </div>
      </nav>
    );
  }

  function Logo() {
    return (
      <header className="flex items-center gap-2 left-10 top-8">
        <div className="size-9 bg-primary rounded-md flex justify-center items-center">
          <SiMarketo className="text-white text-lg" aria-hidden="true" />
        </div>
  
        <h1 className="font-semibold text-2xl font-poppins max-md:hidden">
          Coin <span className="font-normal text-primary">Dash</span>
        </h1>
      </header>
    );
  }
  
  export default Logo;