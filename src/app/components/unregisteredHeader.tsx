import { UserButton } from "@clerk/nextjs";
import { Bell } from "lucide-react";
import Image from "next/image";

function Header(_type: any) {
  return (
    <header>
      <div className="nav-wrapper">
        <nav className="flex items-center justify-between h-14 p-4 text-black bg-background">
          {/* Left Side: Brand Logo */}
          <div className="flex items-center mr-auto">
            <Image
              src="/Graphics/icon.svg"
              alt="Icon"
              width={40}
              height={40}
              className="ml-5"
            />
            <h1 className="ml-8 mt-1 font-[Mayor] text-[hsl(var(--primary-color))] text-[22px]">West</h1>
            <h1 className="ml-0 mt-1 font-[Mayor] text-[hsl(var(--accent-color))] text-[22px]">Track</h1>
          </div>

          {/* Right Side: Search Bar, Bell Icon, and User Button */}
          <div className="flex items-center space-x-5 ml-auto mr-5">
            {/* Search Bar
            <form action="/search" method="get" className="flex justify-center items-center">
              <div className="search-container">
                <input
                  type="search"
                  name="q"
                  placeholder="Search"
                  className="w-[440px] h-9 pl-4 rounded-[40px] mr-12 bg-westTrackGray outline-none pr-4 align-middle border-[1px] border-gray"
                />
              </div>
            </form> */}

            {/* Bell Icon */}
            <ul className="flex space-x-5 items-center">
              <li>
                <Bell size={28} color="#0f0f0f"/>
              </li>
            </ul>

            {/* User Button */}
            <div>
              <UserButton />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
