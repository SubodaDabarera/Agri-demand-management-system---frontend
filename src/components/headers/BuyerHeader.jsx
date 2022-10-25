import React, {useEffect, useState} from "react";
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
    icon: DocumentAddIcon,
  },
  {
    name: "My Requests",
    description: "Speak directly to your customers in a more meaningful way.",
    path: "/farmer/mySeedRequests",
    icon: DocumentTextIcon,
  },
  {
    name: "Evaluated Requests",
    description: "Your customers' data will be safe and secure.",
    path: "#",
    icon: ShieldCheckIcon,
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

const BuyerHeader = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [isLoggedIn, IsLoggedIn] = useState(true);
  const [user, setUSer] = useState("");
  const [id, setID] = useState(localStorage.getItem("user"));

  useEffect(() => {
    function getUser() {
      axios
          .get("http://localhost:8000/api/buyer/" + id)
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
            <div>
              <Link to="/buyer">
                <AiOutlineHome size={34} color="#1a8a38" />
              </Link>
            </div>

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
                  <Link to="/buyer/add-demand">
                    <div className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-emerald-500 hover:bg-emerald-600 transition-colors">
                      + New Demand
                    </div>
                  </Link>
                  <Link
                    to="/buyer/view-demands"
                    className="text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    My Demands
                  </Link>
                </Popover.Group>
              )}

              {isLoggedIn === true ? (
                <>
                  {/* User profile icon here */}

                  <div className="flex">
                    <Link to="/buyer/profile">
                      <img
                          src={user.profileImg}
                          alt="Profile image"
                          className="rounded-full w-10 h-10 mr-4"
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
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      alt="Workflow"
                    />
                  </div>
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
                        <Link
                          to={item.path}
                          key={item.name}
                          href={item.href}
                          className="-m-3 flex items-center p-3 rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-emerald-500 text-white sm:h-12 sm:w-12">
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                          </div>
                          <div className="ml-4 text-base font-medium text-gray-900">
                            {item.name}
                          </div>
                        </Link>
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

export default BuyerHeader;
