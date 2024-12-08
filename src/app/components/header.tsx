import {
  Bell,
  FilesIcon,
  HomeIcon,
  PackageIcon,
  UploadCloud,
  UserCircle,
} from "lucide-react";
import Image from "next/image";
//import NotificationPopup from "./components/notificationPopup";

function Header() {
  //const notifications = [
  //  { id: 1, text: "Your Requested Document #000389 has now been approved", time: "08:32 AM" },
  //  { id: 2, text: "Your Requested Document #000759 has now been approved", time: "05:32 PM" },
  //   { id: 3, text: "Your Requested Document #000389 has now been approved", time: "08:32 AM" },
  //   { id: 4, text: "Your Requested Document #000389 has now been approved", time: "08:32 AM" },
  //];

  return (
    <header className="sticky top-0 z-50">
      <div className="nav-wrapper h-20 z-10">
        <nav className="flex flex-wrap align-middle justify-between p-4 text-white bg-[#0b5ca6]">
          <div className="brand-logo left">
            <Image
              src="/images/Icon_white.png"
              alt="Icon"
              width={60}
              height={60}
              color="#f5f5f"
            />
          </div>
          <ul className="left hide-on-med-and-down flex">
            <li className="mr-5">
              <a href="/users/upload">
                <UploadCloud size={32} />
              </a>
            </li>
            <li className="mr-5">
              <a href="/users/files">
                <FilesIcon size={32} />
              </a>
            </li>
            <li className="mr-5">
              <a href="/users/home">
                <HomeIcon size={32} />
              </a>
            </li>
            <li className="mr-5">
              <a href="/sign-in">
                <UserCircle size={32} />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
