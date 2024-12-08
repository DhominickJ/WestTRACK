import { UserButton } from "@clerk/nextjs";
import { Bell } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

function Header({ onSearch }: { onSearch: (query: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header>
      <div className="nav-wrapper">
        <nav className="flex items-center justify-between h-14 p-4 text-black bg-background">
          <div className="flex items-center mr-auto">
            <Image
              src="/Graphics/icon.svg"
              alt="Icon"
              width={40}
              height={40}
              className="ml-5"
            />
            <h1 className="ml-8">WestTrack</h1>
          </div>

          <div className="flex items-center space-x-5 ml-auto mr-5">
            <form
              onSubmit={handleSearchSubmit}
              className="flex justify-center items-center"
            >
              <div className="search-container">
                <input
                  type="search"
                  name="q"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="w-[440px] h-9 pl-4 rounded-[40px] mr-12 bg-westTrackGray outline-none pr-4 align-middle border-[1px] border-gray"
                />
              </div>
            </form>
            <ul className="flex space-x-5 items-center">
              <li>
                <Bell size={28} color="#0f0f0f" />
              </li>
            </ul>
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
