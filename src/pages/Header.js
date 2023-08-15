import { MenuIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import chat from '../chat.png'

function Header() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-[#002244] flex items-center justify-between py-4 px-6">
        <a href="/">
          <img
            src={chat}
            className="w-32 h-12 object-contain"
            alt=""
          />
        </a>
        <div className="hidden lg:flex space-x-6 text-white">
          <Link to="/signin">Sign-In</Link>
          <Link to="/signup">Sign-Up</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <div className="flex space-x-4">
          <MenuIcon className="h-9 text-white cursor-pointer lg:hidden" />
        </div>
      </header>
      <div className="flex-grow overflow-auto bg-[#6CB4EE]">
        <div className="p-7 py-9 min-h-[83vh] md:flex relative">
          <div className="flex flex-col gap-7 md:max-w-md lg:max-w-none lg:justify-center">
            <h1 className="text-5xl text-white font-bold">Chat Away!!</h1>
            <h2 className="text-black text-lg font-light tracking-wide lg:max-w-3xl w-full">
              Connect with your friends, family and colleague from anywhere in the world. With Chatter, staying in touch becomes effortless, and spending quality time together is just a click away. Experience the joy of meaningful conversations and shared moments, no matter where you are or what you're passionate about.
            </h2>
          </div>
          <div className="flex-grow">
            <img
              src="https://rb.gy/ohwmdy"
              alt=""
              className="absolute -left-36 mt-16 sm:-left-44 md:hidden"
            />
            <img
              src="https://rb.gy/gjs8ch"
              alt=""
              className="hidden md:inline absolute"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
