import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  BookmarkAltIcon,
  BriefcaseIcon,
  ChartBarIcon,
  CheckCircleIcon,
  CursorClickIcon,
  DesktopComputerIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  MenuIcon,
  NewspaperIcon,
  OfficeBuildingIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ViewGridIcon,
  XIcon,
  DocumentAddIcon,
  DocumentTextIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import axios from "axios";

const solutions = [
  {
    name: "New Request",
    description:
      "Get a better understanding of where your traffic is coming from.",
    path: "/farmer/seedRequest",
    href: "/farmer/seedRequest",
    icon: DocumentAddIcon,
    isClicked: false,
  },
  {
    name: "My Requests",
    description: "Speak directly to your customers in a more meaningful way.",
    path: "/farmer/mySeedRequests",
    href: "/farmer/mySeedRequests",
    icon: DocumentTextIcon,
    isClicked: false,
  },
  {
    name: "Evaluated Requests",
    description: "Your customers' data will be safe and secure.",
    path: "/farmer/evaluatedRequest",
    href: "/farmer/evaluatedRequest",
    icon: ShieldCheckIcon,
    isClicked: false,
  },
];
const callsToAction = [
  { name: "Watch Demo", href: "#", icon: PlayIcon },
  { name: "View All Products", href: "#", icon: CheckCircleIcon },
  { name: "Contact Sales", href: "#", icon: PhoneIcon },
];
const company = [
  { name: "About", href: "#", icon: InformationCircleIcon },
  { name: "Customers", href: "#", icon: OfficeBuildingIcon },
  { name: "Press", href: "#", icon: NewspaperIcon },
  { name: "Careers", href: "#", icon: BriefcaseIcon },
  { name: "Privacy", href: "#", icon: ShieldCheckIcon },
];
const resources = [
  { name: "Community", href: "#", icon: UserGroupIcon },
  { name: "Partners", href: "#", icon: GlobeAltIcon },
  { name: "Guides", href: "#", icon: BookmarkAltIcon },
  { name: "Webinars", href: "#", icon: DesktopComputerIcon },
];
const blogPosts = [
  {
    id: 1,
    name: "Boost your conversion rate",
    href: "#",
    preview:
      "Eget ullamcorper ac ut vulputate fames nec mattis pellentesque elementum. Viverra tempor id mus.",
    imageUrl:
      "https://images.unsplash.com/photo-1558478551-1a378f63328e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2849&q=80",
  },
  {
    id: 2,
    name: "How to use search engine optimization to drive traffic to your site",
    href: "#",
    preview:
      "Eget ullamcorper ac ut vulputate fames nec mattis pellentesque elementum. Viverra tempor id mus.",
    imageUrl:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2300&q=80",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FarmerHeader = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [isLoggedIn, IsLoggedIn] = useState(true);
  const [farmerPic, setFarmerPic] = useState("");
  const [user, setUSer] = useState("");
  const [id, setID] = useState(localStorage.getItem("user"));
  const [clickedItem, setClickedItem] = useState("");

  useEffect(() => {
    function getUser() {
      axios
        .get("http://localhost:8000/api/farmers/" + id)
        .then((res) => {
          setUSer(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getUser();
  }, []);

  return (
    <div>
      <Popover className="relative bg-white m-4">
        <div
          className="absolute inset-0 shadow-md shadow-emerald-500/20 z-30 pointer-events-none rounded-lg"
          aria-hidden="true"
        />
        <div className="relative z-20">
          <div className="max-w-full mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10">
            {/* Home logo */}
            <Link to={"/farmer/home"} onClick={() => setClickedItem("home")}>
              {clickedItem === "home" ? (
                <div>
                  <AiOutlineHome size={34} color="#033610" />
                </div>
              ) : (
                <div>
                  <AiOutlineHome size={34} color="#1a8a38" />
                </div>
              )}
            </Link>

            {/* items of header */}
            {isLoggedIn == true && (
              <div className="-mr-2 -my-2 md:hidden">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500">
                  <span className="sr-only">Open menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            )}

            <div
              className={classNames(
                !isLoggedIn ? "relative" : "hidden",
                "md:flex-1 md:flex md:items-center md:justify-between"
              )}
            >
              {isLoggedIn == true && (
                <Popover.Group as="nav" className="flex space-x-10">
                  <Link
                    to="/farmer/seedRequest"
                    onClick={() => setClickedItem("newRequest")}
                  >
                    {/* <div className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-emerald-500 hover:bg-emerald-600 transition-colors focus:bg-red-300">
                      + New Request
                    </div> */}

                    {clickedItem === "newRequest" ? (
                      <div className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-bold text-white bg-emerald-600 hover:bg-emerald-600 transition-colors">
                        + New Request
                      </div>
                    ) : (
                      <div className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-emerald-500 hover:bg-emerald-600 transition-colors">
                        + New Request
                      </div>
                    )}
                  </Link>
                  <Link
                    to="/farmer/mySeedRequests"
                    className="text-base font-medium  hover:text-gray-900"
                    onClick={() => setClickedItem("myRequests")}
                  >
                    {clickedItem === "myRequests" ? (
                      <div className="text-green-700 font-bold">
                        My Requests
                      </div>
                    ) : (
                      <div className="text-gray-500">My Requests</div>
                    )}
                  </Link>
                  <Link
                    to="/farmer/evaluatedRequest"
                    className="text-base font-medium text-gray-500 hover:text-gray-900"
                    onClick={() => setClickedItem("evaluatedRequests")}
                  >
                    {clickedItem === "evaluatedRequests" ? (
                      <div className="text-green-700 font-bold">
                        Evaluated Requests
                      </div>
                    ) : (
                      <div className="text-gray-500">Evaluated Requests</div>
                    )}
                  </Link>

                  {/* If you want dropdown for header, use this */}
                  {/* 
                <Popover>
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? "text-gray-900" : "text-gray-500",
                          "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 focus:px-2"
                        )}
                        onClick={() => setSelectedItem("solutions")}
                      >
                        <span>Solutions</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? "text-gray-600" : "text-gray-400",
                            "ml-2 h-5 w-5 group-hover:text-gray-500"
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 -translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 -translate-y-1"
                      >
                        <Popover.Panel className="hidden md:block absolute z-10 top-full inset-x-0 transform shadow-lg bg-white">
                          <div className="max-w-7xl mx-auto grid gap-y-6 px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16">
                            {solutions.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className="-m-3 p-3 flex flex-col justify-between rounded-lg hover:bg-gray-50"
                              >
                                <div className="flex md:h-full lg:flex-col">
                                  <div className="flex-shrink-0">
                                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                                      <item.icon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </div>
                                  <div className="ml-4 md:flex-1 md:flex md:flex-col md:justify-between lg:ml-0 lg:mt-4">
                                    <div>
                                      <p className="text-base font-medium text-gray-900">
                                        {item.name}
                                      </p>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {item.description}
                                      </p>
                                    </div>
                                    <p className="mt-2 text-sm font-medium text-indigo-600 lg:mt-4">
                                      Learn more{" "}
                                      <span aria-hidden="true">&rarr;</span>
                                    </p>
                                  </div>
                                </div>
                              </a>
                            ))}
                          </div>
                          <div className="bg-gray-50">
                            <div className="max-w-7xl mx-auto space-y-6 px-4 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-6 lg:px-8">
                              {callsToAction.map((item) => (
                                <div key={item.name} className="flow-root">
                                  <a
                                    href={item.href}
                                    className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                                  >
                                    <item.icon
                                      className="flex-shrink-0 h-6 w-6 text-gray-400"
                                      aria-hidden="true"
                                    />
                                    <span className="ml-3">{item.name}</span>
                                  </a>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover> */}
                </Popover.Group>
              )}

              {isLoggedIn === true ? (
                <>
                  {/* User profile icon here */}
                  <div className="flex">
                    <Link to={'/farmer/profile'}>
                    <img
                      src={user.profileImg}
                      alt="Profile image"
                      className="rounded-full w-10 h-10 text-sm mr-4"
                    />
                    </Link>
                    <button
                      className="-mr-3 text-gray-500 hover:text-gray-600 hover:scale-105"
                      onClick={() => {
                        localStorage.removeItem("user");
                        localStorage.removeItem("userRole");
                        window.location.href = "/";
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={classNames(
                      !isLoggedIn && "-mt-5 md:mt-0",
                      "absolute right-0 flex items-center"
                    )}
                  >
                    <a
                      href="#"
                      className="text-base font-medium text-gray-500 hover:text-gray-900 whitespace-nowrap"
                    >
                      Sign in
                    </a>
                    <a
                      href="#"
                      className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-emerald-500 hover:bg-emerald-600 transition-colors whitespace-nowrap "
                    >
                      Sign up
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-emerald-500 ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5 sm:pb-8">
                <div className="flex items-center justify-between">
                  <div></div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6 sm:mt-8">
                  <nav>
                    <div className="grid gap-y-4 sm:gap-x-4">
                      {solutions.map((item) => (
                        <a
                          // to={item.path}
                          // key={item.name}
                          href={item.href}
                          className="-m-3 flex items-center p-3 rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-emerald-500 text-white sm:h-12 sm:w-12">
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                          </div>
                          <div className="ml-4 text-base font-medium text-gray-900">
                            {item.name}
                          </div>
                        </a>
                      ))}
                    </div>
                  </nav>
                </div>
              </div>
              <div className="py-6 px-5 mt-6">
                <div className="text-center text-sm text-gray-400">
                  -- All rights reserved for SLIIT --
                </div>

                {isLoggedIn === false ? (
                  <>
                    <div className="items-center md:ml-12">
                      <a
                        href="#"
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-emerald-500 hover:bg-emerald-600"
                      >
                        Sign up
                      </a>
                      <p className="mt-3 text-center text-base font-medium text-gray-500">
                        Existing customer?{" "}
                        <a
                          href="#"
                          className="text-emerald-600 hover:text-emarald-500"
                        >
                          Sign in
                        </a>
                      </p>
                    </div>
                  </>
                ) : (
                  <>{/* Display whatever when user login */}</>
                )}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
};

export default FarmerHeader;
