"use client";
import Logo from "@/components/ui/MainLogo";
import SearchSection from "@/components/ui/SearchSection";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  FaBriefcase,
  FaDownload,
  FaSearch,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

import { useGetMeQuery } from "@/redux/features/auth/auth";
import Cookies from "js-cookie";
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi"; // For modern icons
import { LuUser } from "react-icons/lu";
import { toast } from "sonner";

type NavItem = {
  name: string;
  href: string;
};

type NavbarProps = {
  navItem: NavItem[];
};

export default function Navbar({ navItem }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isTrue, setIsTrue] = useState(false);
  const { data: me } = useGetMeQuery({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [user, setUser] = useState<string | any>("");
  const [isLogned, setIsLogned] = useState<string | null>(null);

  const [searchView, setSearchView] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // detecting outside click 
  const hiddenMenuByClick = useRef<HTMLDivElement>(null);
  // 🔹 Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        hiddenMenuByClick.current &&
        !hiddenMenuByClick.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const targetRoutes = ["/", "/jobSeeker/home", "/jobs"];

    if (targetRoutes.includes(pathname)) {
      setSearchView(true);
    } else {
      setSearchView(false);
    }
  }, [pathname]);

  const MenuItem = ({
    icon,
    label,
    active = false,
    danger = false,
    logoutBtn,
    onClick,
  }: {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    danger?: boolean;
    logoutBtn?: () => void;
    onClick?: () => void;
  }) => (
    <div
      onClick={logoutBtn}
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
    ${active ? "font-medium" : ""}
    ${danger ? "text-red-500 hover:bg-red-100" : "hover:bg-gray-100"}
  `}
    >
      {label === "Applied Job" ? (
        <Link className="flex gap-3 " href="/jobSeeker/my-applications">
          <div className="text-xl">{icon}</div>
          <span>{label}</span>
        </Link>
      ) : label === "My Profile" ? (
        <Link className="flex gap-3" href="/jobSeeker/my-profile">
          <div className="text-xl">{icon}</div>
          <span>{label}</span>
        </Link>
      ) : label === "Download My Resume" ? (
        <Link className="flex gap-3" href="/jobSeeker/resume-download">
          <div className="text-xl">{icon}</div>
          <span>{label}</span>
        </Link>
      ) : (
        <>
          <div className="text-xl">{icon}</div>
          <span>{label}</span>
        </>
      )}
    </div>
  );

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const menuRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      setIsLogned(accessToken);
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        event.target &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };
    if (me?.data) {
      setUser(me?.data);
    }


    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu, me?.data]);

  

  const handleSearch = () => {
    console.log("first");

    setAnimate(!animate);
  };

  const handleLogout = () => {
    setShowDeleteModal(true);
  };

  // logout functtion working
  const handleDelete = () => {
    localStorage.removeItem("accessToken");
    Cookies.remove("accessToken");
    setUser(null);
    setShowMenu(false);
    setShowDeleteModal(false);
    setIsLogned(null);
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
      <div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href={"/"}>
          <div className="flex items-center space-x-2">
            {/* <img src="/mainlogo.png" alt="Logo" className="h-[40px] w-auto" /> */}
            <Logo width={153} height={72} />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4 items-center text-sm font-medium text-gray-700">
          <button
            onClick={() => handleSearch()}
            className={`flex items-center gap-2 px-6 py-3 bg-primary text-white rounded hover:bg-neutral-900 transition whitespace-nowrap cursor-pointer ${searchView ? "hidden" : ""
              } `}
          >
            <FaSearch />
            Search
          </button>
          <span
            className={`w-0.5 h-6 bg-gray-300   ${searchView ? "hidden" : "inline-block"
              }`}
          ></span>

          {Array.isArray(navItem) &&
            navItem.map((item, index) => (
              <React.Fragment key={item.name}>
                <Link
                  href={item.href}
                  className="hover:text-primary hover:underline transition-colors duration-200 "
                >
                  {item.name}
                </Link>

                {index < navItem.length - 1 && (
                  <span className="w-0.5 h-6 bg-gray-300 inline-block"></span>
                )}
              </React.Fragment>
            ))}

          {/* <Image
            src={"src"}
            alt={"alt"}
            width={60}
            height={60}
            className="rounded-full object-cover"
          /> */}

          <div className="relative">
            <button
              onClick={toggleMenu}
              className="flex items-center gap-2 cursor-pointer"
            >
              <p className="flex items-center hover:scale-105 transition-all duration-300">
                {isLogned ? <><LuUser className="size-9 bg-primary hover:bg-green-700 transition-all duration-300 cursor-pointer rounded-full p-2 text-white mr-2" />{user?.fullName}
                </> : <>
                  <Link
                    onClick={() => setShowMenu(false)}
                    href={"/signIn"}
                    className="w-full text-left hover:bg-green-600 bg-primary text-white rounded-md px-5 py-2 transition-all duration-200"
                  >
                    Sign In
                  </Link></>}</p>
            </button>

            {showMenu && (
              <div className="absolute top-12 -right-2 min-w-[120px] z-50">
                {isLogned ? (
                  // <button
                  //   onClick={() => setShowMenu(false)}
                  //   className="w-full text-left hover:text-main-green">Profile</button>
                  <div onClick={() => setShowMenu(false)}>
                    <div className="w-72 bg-white/80 backdrop-blur-xl shadow-md rounded-xl p-4 space-y-2">
                      <MenuItem icon={<FaUser />} label="My Profile" />
                         <div className="border-b border-gray-300 my-2"></div> 
                      <MenuItem
                        icon={<FaDownload />}
                        label="Download My Resume"
                        active
                      />
                         <div className="border-b border-gray-300 my-2"></div> 
                      <MenuItem icon={<FaBriefcase />} label="Applied Job" />
                        <div className="border-b border-gray-300 my-2"></div> 
                      <MenuItem
                        icon={<FaSignOutAlt />}
                        label="Log Out"
                        danger
                        logoutBtn={handleLogout}
                        onClick={() => setShowDeleteModal(true)}
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <FiX className="w-6 h-6" />
          ) : (
            <FiMenu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div ref={hiddenMenuByClick}
        className={`md:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? "max-h-screen" : "max-h-0"
          }`}
      >
        <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {navItem.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block text-gray-700 hover:text-main-green font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="relative">
            <button onClick={toggleMenu}>
              <LuUser className="size-9 bg-primary hover:bg-green-700 transition-all duration-300 cursor-pointer rounded-full p-2 text-white" />

            </button>

            {showMenu && (
              <div
                className={`absolute min-w-[120px] -top-50 left-2 z-50 scale-75 transition-all duration-300 ease-in-out ${showMenu ? "translate-x-0 opacity-100" : "-translate-x-[250px] opacity-0"
                  }`}
              >
                {isLogned ? (

                  <div onClick={() => setShowMenu(false)}>
                    <div className="w-72 bg-white/20 backdrop-blur-xl shadow-md rounded-xl p-4 space-y-2">
                      <MenuItem icon={<FaUser />} label="My Profile" />
                      <div className="border-b border-gray-300 my-2"></div> {/* Divider */}

                      <MenuItem icon={<FaDownload />} label="Download My Resume" active />
                      <div className=" border-gray-300 my-2"></div> {/* Divider */}

                      <Link href={"/jobSeeker/my-application"}>
                        <div className="border-b border-gray-300 my-2"></div> {/* Divider */}
                      </Link>

                      <Link href={"/jobSeeker/my-application"}>
                        <MenuItem icon={<FaBriefcase />} label="Applied Job" />
                      </Link>
                      <div className="border-b border-gray-300 my-2"></div> {/* Divider */}

                      <MenuItem
                        icon={<FaSignOutAlt />}
                        label="Log Out"
                        danger
                        logoutBtn={handleLogout}
                      />
                    </div>
                  </div>
                ) : (
                  <Link
                    onClick={() => setShowMenu(false)}
                    href={"/signIn"}
                    className="w-full text-left hover:text-main-green bg-gray-200/80 shadow-lg rounded-md px-5 py-2"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {animate && (
        <div
          className="fixed inset-0 bg-black/30 bg-opacity-40 z-5 transition-opacity duration-300"
          onClick={handleSearch} // Optional: click backdrop to close
        ></div>
      )}

      <div
        className={`
        absolute bg-white border-t-2 border-gray-400 w-full py-12 
        transform transition-all duration-500 ease-out z-10
        ${animate ? "translate-y-0 opacity-100" : "-translate-y-250 opacity-0"}
      `}
      >
        <SearchSection setAnimate={setAnimate} animate={animate} />
      </div>

      {/* modal logout  */}

      {showDeleteModal && (
        <div
          className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50 p-4"
        // onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-2xl shadow-xl max-w-[645px] w-full mx-4 relative">
            {/* Close button */}
            <button
                onClick={() => setShowDeleteModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Modal content */}
            <div className="p-8 text-center">
              <div className="flex justify-center md:mb-[32px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="195"
                  height="194"
                  viewBox="0 0 195 194"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M42.984 15.3982C42.9545 9.34543 47.6551 4.09346 58.1769 3.88472C68.6987 3.67598 75.7219 10.2669 74.4644 15.3695C72.8243 22.0276 61.3926 23.8974 61.5785 30.9213C61.6068 31.9895 54.6465 31.8913 54.6465 30.8243C54.4862 23.8279 68.3704 20.4473 68.5803 15.2388C68.7639 10.6724 65.034 8.19695 58.2339 8.19695C53.5096 8.19695 49.5385 10.6309 49.1904 15.3424C49.1311 16.3384 42.989 16.3942 42.9824 15.3971L42.984 15.3982Z"
                    fill="#5F6CAF"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M58.073 34.2422C60.7246 34.2422 62.8776 35.6677 62.8776 37.4238C62.8776 39.1799 60.7246 40.6054 58.073 40.6054C55.4214 40.6054 53.2695 39.1799 53.2695 37.4238C53.2695 35.6677 55.4222 34.2422 58.073 34.2422Z"
                    fill="#5F6CAF"
                  />
                  <path
                    d="M139.097 42.7317C139.354 50.2589 131.8 61.3945 128.585 66.2643L128.571 66.2779C127.825 65.0844 126.388 64.1078 124.136 63.6736C125.642 60.459 128.422 51.019 129.277 47.1126C120.555 38.1063 97.6059 34.5391 95.9511 37.1433C95.612 37.6586 95.3001 38.1878 94.9881 38.7167C84.7748 33.8473 85.195 15.2112 89.8475 12.5655C91.9093 11.3856 94.4725 11.9416 96.887 14.3693C96.9956 12.647 98.7315 9.47311 101.499 9.24225C104.618 8.97065 107.209 11.3856 108.987 15.3339C108.621 12.2687 111.375 8.18612 115.796 9.32528C118.658 10.0578 122.171 18.0467 126.145 22.726C130.132 27.4453 138.853 36.0313 139.097 42.7317Z"
                    fill="#29263B"
                  />
                  <path
                    d="M108.862 33.0188C108.72 33.0187 108.582 32.9743 108.467 32.8917C108.352 32.8091 108.266 32.6925 108.22 32.5583C107.162 29.4423 107.342 24.6128 108.116 21.9271C108.14 21.8415 108.182 21.7616 108.237 21.6919C108.293 21.6223 108.361 21.5643 108.439 21.5212C108.517 21.4781 108.603 21.4508 108.692 21.4408C108.78 21.4308 108.87 21.4384 108.955 21.463C109.041 21.4877 109.121 21.529 109.19 21.5845C109.26 21.6401 109.318 21.7088 109.361 21.7867C109.404 21.8647 109.432 21.9504 109.442 22.0389C109.452 22.1274 109.444 22.2171 109.419 22.3027C108.699 24.8037 108.561 29.3468 109.504 32.1237C109.539 32.2258 109.549 32.3346 109.533 32.4412C109.517 32.5478 109.476 32.6491 109.413 32.7367C109.35 32.8243 109.268 32.8958 109.172 32.9451C109.076 32.9944 108.97 33.0202 108.862 33.0204V33.0188Z"
                    fill="#686674"
                  />
                  <path
                    d="M102.216 32.9664C102.083 32.9664 101.953 32.9272 101.842 32.8538C101.731 32.7804 101.644 32.676 101.592 32.5536C100.048 28.9787 99.4973 25.0535 99.998 21.1918C100.024 21.0137 100.119 20.8531 100.263 20.7454C100.407 20.6377 100.588 20.5916 100.766 20.6173C100.945 20.6431 101.105 20.7385 101.213 20.8826C101.321 21.0267 101.367 21.2077 101.341 21.3858C100.874 25.0021 101.392 28.6774 102.84 32.0239C102.884 32.1271 102.902 32.2395 102.891 32.3511C102.881 32.4627 102.843 32.57 102.782 32.6635C102.72 32.757 102.636 32.8337 102.537 32.8869C102.439 32.94 102.328 32.9678 102.216 32.9679V32.9664Z"
                    fill="#686674"
                  />
                  <path
                    d="M96.686 33.2096C96.5781 33.2098 96.4717 33.1842 96.3757 33.1349C96.2796 33.0856 96.1967 33.0141 96.1339 32.9264C93.9471 29.8763 92.9007 26.1321 93.0233 21.797C93.0244 21.7074 93.0435 21.6189 93.0795 21.5368C93.1155 21.4548 93.1676 21.3807 93.2328 21.3192C93.2979 21.2577 93.3748 21.2099 93.4588 21.1786C93.5428 21.1474 93.6322 21.1334 93.7217 21.1374C93.811 21.1397 93.8989 21.1596 93.9804 21.196C94.0619 21.2324 94.1354 21.2846 94.1967 21.3495C94.258 21.4144 94.3059 21.4907 94.3376 21.5742C94.3692 21.6577 94.3841 21.7466 94.3813 21.8358C94.2649 25.9245 95.2004 29.2943 97.2386 32.1368C97.3111 32.2381 97.3543 32.3575 97.3635 32.4817C97.3727 32.606 97.3475 32.7304 97.2907 32.8413C97.2338 32.9522 97.1476 33.0453 97.0413 33.1104C96.9351 33.1755 96.813 33.2101 96.6884 33.2104L96.686 33.2096Z"
                    fill="#686674"
                  />
                  <path
                    d="M94.9868 38.7163C88.7071 49.3909 86.9708 61.7472 87.893 67.1318C89.1273 74.3615 95.7993 78.8844 102.216 78.8844C102.338 81.8549 102.108 86.7584 102.108 86.7584C102.108 86.7584 98.7031 87.4502 94.5119 88.6437C93.1695 113.425 121.585 115.133 130.917 90.8553C127.327 89.2155 123.606 87.8772 119.794 86.8543C119.794 86.8543 119.51 77.1698 120.581 72.3547C126.929 75.5286 130.957 69.9406 128.57 66.2783C127.824 65.0848 126.387 64.1082 124.135 63.674C125.64 60.4594 128.421 51.0194 129.276 47.113C120.554 38.1067 97.6047 34.5395 95.9499 37.1437C95.6107 37.6582 95.2988 38.1874 94.9868 38.7163Z"
                    fill="#FFA775"
                  />
                  <path
                    d="M122.847 70.4685C122.783 70.4685 122.721 70.4507 122.667 70.417C122.613 70.3833 122.57 70.3351 122.542 70.278C122.514 70.2208 122.503 70.157 122.51 70.0938C122.516 70.0306 122.541 69.9706 122.58 69.9206C123.802 68.3566 125.244 67.5771 126.99 67.5387C127.035 67.5359 127.08 67.5425 127.122 67.5579C127.164 67.5734 127.203 67.5974 127.235 67.6286C127.268 67.6597 127.294 67.6972 127.311 67.7388C127.328 67.7803 127.337 67.825 127.336 67.8701C127.337 67.9146 127.329 67.9589 127.313 68.0004C127.297 68.0419 127.273 68.0798 127.242 68.112C127.212 68.1442 127.175 68.17 127.134 68.1879C127.093 68.2059 127.049 68.2156 127.005 68.2165C125.453 68.2511 124.218 68.925 123.114 70.3381C123.083 70.3788 123.042 70.4118 122.996 70.4344C122.949 70.4569 122.898 70.4686 122.847 70.4685Z"
                    fill="#29263B"
                  />
                  <path
                    d="M95.6565 45.8255C94.8679 45.8178 94.092 45.6256 93.3909 45.2645C93.2895 45.2205 93.1981 45.1563 93.1223 45.0759C93.0465 44.9955 92.9878 44.9005 92.9499 44.7967C92.912 44.6928 92.8955 44.5824 92.9016 44.472C92.9077 44.3617 92.9362 44.2537 92.9854 44.1547C93.0345 44.0557 93.1033 43.9677 93.1875 43.8961C93.2717 43.8245 93.3696 43.7709 93.4753 43.7383C93.5809 43.7058 93.6921 43.695 93.802 43.7068C93.9119 43.7186 94.0182 43.7526 94.1146 43.8068C95.6813 44.5828 97.1933 44.1948 98.8718 42.5791C98.9475 42.4986 99.0387 42.4343 99.1399 42.3902C99.2412 42.346 99.3504 42.3229 99.4608 42.3223C99.5713 42.3216 99.6808 42.3435 99.7825 42.3864C99.8843 42.4294 99.9763 42.4926 100.053 42.5722C100.129 42.6518 100.189 42.7462 100.228 42.8495C100.267 42.9529 100.285 43.0631 100.28 43.1734C100.275 43.2838 100.247 43.392 100.199 43.4915C100.151 43.5909 100.084 43.6796 100 43.7521C98.5653 45.133 97.1119 45.8255 95.6565 45.8255Z"
                    fill="#29263B"
                  />
                  <path
                    d="M118.518 49.4053C118.322 49.4048 118.133 49.334 117.986 49.2058C117.838 49.0776 117.741 48.9005 117.713 48.7069C117.644 48.0706 117.427 47.4595 117.079 46.9222C116.731 46.385 116.263 45.9366 115.711 45.6129C115.233 45.3646 114.701 45.2371 114.162 45.2413C113.623 45.2456 113.094 45.3816 112.62 45.6374C112.426 45.7211 112.208 45.7269 112.011 45.6536C111.814 45.5802 111.653 45.4334 111.561 45.2438C111.47 45.0543 111.455 44.8367 111.521 44.6367C111.586 44.4366 111.726 44.2697 111.912 44.1707C112.617 43.804 113.401 43.613 114.196 43.6143C114.991 43.6155 115.774 43.8088 116.478 44.1777C117.256 44.6221 117.919 45.2427 118.413 45.9899C118.908 46.737 119.22 47.5897 119.325 48.4795C119.355 48.6932 119.299 48.9102 119.169 49.0826C119.039 49.2551 118.846 49.369 118.633 49.3994C118.595 49.4039 118.556 49.4058 118.518 49.4053Z"
                    fill="#29263B"
                  />
                  <path
                    d="M102.365 70.1573C102.284 70.1572 102.206 70.1284 102.145 70.0762C102.084 70.0239 102.043 69.9516 102.03 69.8721C101.928 69.378 102.006 68.8636 102.25 68.4218C102.493 67.98 102.887 67.64 103.359 67.463C104.695 66.926 106.774 67.437 108.164 69.4492C108.216 69.5232 108.235 69.6145 108.219 69.703C108.203 69.7915 108.152 69.8699 108.078 69.921C108.004 69.9721 107.913 69.9916 107.824 69.9754C107.736 69.9592 107.657 69.9085 107.606 69.8344C106.419 68.1144 104.696 67.657 103.612 68.0923C103.281 68.2106 103.006 68.4464 102.837 68.7546C102.669 69.0629 102.62 69.4222 102.7 69.7642C102.714 69.8529 102.692 69.9435 102.64 70.0162C102.587 70.0889 102.508 70.1378 102.419 70.1522C102.401 70.1552 102.383 70.1569 102.365 70.1573Z"
                    fill="#29263B"
                  />
                  <path
                    d="M99.5432 62.4803C99.5058 62.4803 99.4685 62.4741 99.433 62.4621C99.0404 62.3274 95.5852 61.1017 95.3156 59.4702C95.0382 57.7905 99.3333 49.213 100.559 47.5493C100.612 47.4768 100.692 47.4285 100.781 47.415C100.87 47.4015 100.96 47.4238 101.033 47.4771C101.105 47.5304 101.154 47.6103 101.167 47.6992C101.181 47.7881 101.158 47.8788 101.105 47.9512C99.7163 49.8369 95.7742 58.0835 95.9833 59.3584C96.1385 60.2896 98.3144 61.3613 99.6515 61.8191C99.7272 61.8453 99.7912 61.8975 99.8321 61.9663C99.8731 62.0352 99.8883 62.1163 99.8752 62.1953C99.862 62.2743 99.8213 62.3461 99.7603 62.398C99.6992 62.4499 99.6218 62.4785 99.5417 62.4787L99.5432 62.4803Z"
                    fill="#29263B"
                  />
                  <path
                    d="M149.689 185.92C134.484 190.382 95.3801 192.349 79.9311 186.421L79.3491 130.868L62.0176 123.894C62.0176 123.894 71.5364 100.784 81.709 93.853C84.8556 91.6965 90.1185 89.8923 94.513 88.6445C93.1705 113.425 121.586 115.134 130.918 90.8561C136.112 93.2163 142.148 96.7021 146.678 101.504C156.565 111.974 149.689 185.92 149.689 185.92Z"
                    fill="#F47C7C"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M113.462 50.7691C114.282 50.9779 114.604 52.4996 114.179 54.1641C113.755 55.8286 112.744 57.0082 111.923 56.7994C111.103 56.5907 110.78 55.0686 111.205 53.4044C111.63 51.7403 112.64 50.56 113.462 50.7691Z"
                    fill="#29263B"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M96.107 46.8465C96.9291 47.0568 97.2504 48.5769 96.8259 50.2415C96.4015 51.906 95.3903 53.0871 94.5689 52.8768C93.7476 52.6665 93.4271 51.1459 93.8515 49.4833C94.276 47.8207 95.2871 46.6373 96.107 46.8449V46.8465Z"
                    fill="#29263B"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M144.081 123.332C144.081 123.332 141.019 114.796 136.186 113.836C131.212 112.846 124.405 117.051 119.114 121.22C114.756 111.735 109.943 99.2268 109.889 94.6628C112.711 88.0113 109.836 82.4582 116.854 76.0725C120.104 73.1156 115.414 68.7304 111.025 73.7166C107.691 77.5046 102.178 77.4247 99.1566 76.8035C93.1356 75.5693 89.8058 71.2031 88.5499 69.4727C84.5244 69.9173 85.3826 74.3145 86.3417 76.2258C84.4184 76.7861 83.5396 80.2148 84.8064 82.3294C83.2668 83.4729 82.5778 85.144 84.4277 88.3869C82.9413 89.8438 83.5082 92.7515 85.1386 94.1824C85.1386 94.1824 89.9199 97.4773 93.1702 98.8838C94.609 109.634 96.8264 120.266 99.805 130.695C90.4154 132.333 79.4156 133.562 79.4156 133.562L79.3721 130.916L63.2003 124.37C59.0099 134.268 56.8576 153.221 66.2759 157.187C74.5721 160.679 89.8275 158.488 106.476 148.534C110.585 156.835 115.682 162.774 121.836 162.78C131.864 162.792 138.437 153.179 138.437 153.179C140.265 147.714 139.407 142.315 135.849 138.284C135.841 138.247 135.837 138.206 135.826 138.173C137.87 138.896 140.862 136.893 140.036 134.743C141.821 135.242 143.346 132.886 143.143 129.388C144.467 128.062 144.78 126.043 144.081 123.332Z"
                    fill="#FFA775"
                  />
                  <path
                    d="M135.927 138.383C135.84 138.383 135.757 138.35 135.694 138.29C135.631 138.23 135.593 138.149 135.588 138.062C135.437 135.259 134.308 132.602 132.035 129.701C131.983 129.63 131.96 129.542 131.972 129.454C131.984 129.367 132.029 129.288 132.099 129.233C132.168 129.179 132.256 129.154 132.344 129.163C132.431 129.172 132.512 129.215 132.568 129.283C134.932 132.299 136.106 135.077 136.266 138.026C136.271 138.116 136.24 138.204 136.18 138.271C136.119 138.338 136.035 138.378 135.945 138.383L135.927 138.383Z"
                    fill="#29263B"
                  />
                  <path
                    d="M140.123 134.811C140.043 134.81 139.966 134.782 139.905 134.731C139.844 134.679 139.803 134.608 139.789 134.529C139.167 130.717 137.278 127.225 134.429 124.616C134.363 124.555 134.325 124.469 134.322 124.379C134.32 124.289 134.353 124.202 134.415 124.137C134.476 124.071 134.562 124.033 134.652 124.03C134.742 124.028 134.829 124.061 134.894 124.123C137.837 126.842 139.794 130.462 140.458 134.414C140.473 134.503 140.452 134.594 140.401 134.667C140.349 134.741 140.27 134.791 140.181 134.806C140.162 134.809 140.142 134.811 140.123 134.811Z"
                    fill="#29263B"
                  />
                  <path
                    d="M143.228 129.736C143.152 129.736 143.078 129.711 143.018 129.663C142.958 129.616 142.916 129.55 142.898 129.475C141.915 125.327 139.947 121.922 137.052 119.356C137.018 119.327 136.991 119.291 136.972 119.251C136.952 119.211 136.941 119.168 136.938 119.123C136.933 119.033 136.963 118.945 137.023 118.878C137.082 118.811 137.166 118.77 137.256 118.764C137.346 118.759 137.434 118.789 137.501 118.849C140.504 121.509 142.542 125.032 143.558 129.319C143.579 129.407 143.564 129.499 143.516 129.575C143.469 129.652 143.394 129.707 143.306 129.728C143.281 129.733 143.254 129.736 143.228 129.736Z"
                    fill="#29263B"
                  />
                  <path
                    d="M127.704 137.354C127.644 137.354 127.585 137.338 127.533 137.308C127.48 137.277 127.437 137.233 127.408 137.181L124.876 132.65C121.282 128.451 109.633 101.632 109.55 94.6644C109.55 94.6176 109.559 94.5713 109.577 94.5282C110.58 92.1614 110.853 89.911 111.118 87.7312C111.601 83.7433 112.058 79.9766 116.627 75.8196C117.413 75.1045 117.745 74.2339 117.539 73.4299C117.424 73.0401 117.205 72.6889 116.906 72.414C116.606 72.1391 116.238 71.951 115.84 71.8698C114.404 71.5268 112.74 72.2795 111.28 73.9382C108.148 77.4973 102.929 77.923 99.0893 77.1334C94.8799 76.2709 91.242 73.7578 88.2765 69.6694C88.2486 69.6335 88.2282 69.5924 88.2165 69.5484C88.2048 69.5044 88.202 69.4586 88.2084 69.4135C88.2148 69.3685 88.2302 69.3252 88.2537 69.2862C88.2771 69.2473 88.3082 69.2134 88.345 69.1867C88.3819 69.16 88.4237 69.141 88.468 69.1307C88.5123 69.1205 88.5583 69.1193 88.6031 69.1272C88.6479 69.1351 88.6906 69.1519 88.7288 69.1767C88.7669 69.2015 88.7997 69.2336 88.8252 69.2713C89.8926 70.743 93.1401 75.2217 99.2255 76.4691C100.488 76.7287 106.976 77.8031 110.771 73.4904C112.403 71.6362 114.309 70.8051 115.998 71.2106C116.516 71.32 116.994 71.5688 117.382 71.9301C117.769 72.2915 118.05 72.7517 118.195 73.2611C118.467 74.3165 118.061 75.4316 117.084 76.3209C112.702 80.3084 112.26 83.9536 111.792 87.8127C111.525 90.0181 111.249 92.2972 110.231 94.7265C110.389 101.731 121.896 128.178 125.412 132.23C125.427 132.248 125.44 132.267 125.451 132.287L128 136.848C128.028 136.899 128.043 136.957 128.043 137.017C128.042 137.076 128.026 137.133 127.996 137.184C127.966 137.235 127.924 137.278 127.873 137.307C127.821 137.336 127.763 137.352 127.704 137.352V137.354Z"
                    fill="#29263B"
                  />
                </svg>
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-4xl font-semibold md:font-bold text-gray-900 mb-2">
                <>
                  Are you sure <br /> Logout your Account?
                </>
              </h2>

              {/* Message */}
              {/* <p className="text-gray-600 mb-8">{message}</p> */}

              {/* Action buttons */}
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 md:px-6 cursor-pointer md:py-3 py-2 border border-gray-300 bg-gray-200 rounded md:rounded-lg hover:bg-gray-50 transition-colors font-medium text-xs md:text-base"
                >
                  No, Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className={`flex-1 px-2 md:px-6 py-1 md:py-3 rounded md:rounded-lg  font-medium bg-red-600 hover:bg-red-800 transition text-white text-xs md:text-base cursor-pointer`}
                >
                  Yes, Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}




