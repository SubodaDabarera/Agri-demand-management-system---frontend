import { Fragment, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/solid";
import SignIn from "../components/welcomeScreen/SignIn";
import SignUp from "../components/welcomeScreen/SignUp";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { name: "Items", href: "#" },
  { name: "Farmers", href: "#" },
  { name: "Buyers", href: "#" },
  { name: "About Us", href: "#" },
];

function Dashboard() {
  const [clickedItem, setClickedItem] = useState("sign-up");

  return (
    <div className="relative h-full bg-emerald-800 overflow-hidden">
      <div
        className="hidden sm:block sm:absolute sm:inset-0"
        aria-hidden="true"
      >
        <svg
          className="absolute bottom-0 right-0 transform translate-x-1/2 mb-48 text-gray-700 lg:top-0 lg:mt-20 lg:mb-0 xl:transform-none xl:translate-x-0"
          width={400}
          height={400}
          viewBox="0 0 364 384"
          fill="none"
        >
          <defs>
            <pattern
              id="eab71dd9-9d7a-47bd-8044-256344ee00d0"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} fill="#048727" />
            </pattern>
          </defs>
          <rect
            width={364}
            height={384}
            fill="url(#eab71dd9-9d7a-47bd-8044-256344ee00d0)"
          />
        </svg>
      </div>
      <div className="relative pt-6 pb-16 sm:pb-24">
        <main className="mt-4 sm:mt-24">
          <div className="mx-auto max-w-7xl ">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                <div>
                  {/* <a
                    href="#"
                    className="inline-flex items-center text-white bg-gray-900 rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
                  >
                    <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-indigo-500 rounded-full">
                      We're hiring
                    </span>
                    <span className="ml-4 text-sm">Visit our careers page</span>
                    <ChevronRightIcon
                      className="ml-2 w-5 h-5 text-gray-500"
                      aria-hidden="true"
                    />
                  </a> */}
                  <h1 className="mt-1 text-3xl tracking-tight font-extrabold text-white sm:mt-1 sm:leading-none lg:mt-1 lg:text-4xl xl:text-5xl">
                    <span className="md:block">Contribute to enrich your</span>{" "}
                    <span className="text-green-400 md:block lg:text-6xl">
                      agricultural products
                    </span>
                  </h1>
                  <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                   A system to manage supply and demand of agricultural produce in Sri Lanka
                  </p>
                  <p className="mt-8 text-sm text-white uppercase tracking-wide font-semibold sm:mt-10">
                    Used by
                  </p>
                  <div className="mt-5 w-full sm:mx-auto sm:max-w-lg lg:ml-0">
                    <div className="flex flex-wrap items-start justify-between">
                      <div className="flex justify-center px-1">
                        <img
                          className="h-9 sm:h-10"
                          src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg"
                          alt="Tuple"
                        />
                      </div>
                      <div className="flex justify-center px-1">
                        <img
                          className="h-9 sm:h-10"
                          src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg"
                          alt="Workcation"
                        />
                      </div>
                      <div className="flex justify-center px-1">
                        <img
                          className="h-9 sm:h-10"
                          src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg"
                          alt="StaticKit"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6 ">
                <div className=" bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
                  <ul class="mt-2 flex items-center justify-center flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li class="mr-2 w-1/3">
                      <a
                        href="#"
                        // class="inline-block py-2 px-12 text-emerald-500 hover:text-green-700"
                        className={classNames(
                          clickedItem == "sign-up"
                            ? "border-b border-emerald-300 text-green-700"
                            : "text-emerald-500 hover:text-green-700",
                          "inline-block py-2 px-12 md:mt-8"
                        )}
                        aria-current="page"
                        onClick={() => setClickedItem("sign-up")}
                      >
                        Sign In
                      </a>
                    </li>
                    {/*<li class="mr-2 w-1/3 ">*/}
                    {/*  <a*/}
                    {/*    href="#"*/}
                    {/*    className={classNames(*/}
                    {/*      clickedItem == "sign-in"*/}
                    {/*        ? "border-b border-emerald-300 text-green-700"*/}
                    {/*        : "text-emerald-500 hover:text-green-700",*/}
                    {/*      "inline-block py-2 px-12"*/}
                    {/*    )}*/}
                    {/*    onClick={() => setClickedItem("sign-in")}*/}
                    {/*  >*/}
                    {/*    Sign In*/}
                    {/*  </a>*/}
                    {/*</li>*/}
                  </ul>
                  <hr className="mt-2" />

                  {/*{clickedItem == "sign-in" && <SignIn />}*/}
                  {clickedItem == "sign-up" && <SignUp />}

                  <div className="px-4 py-6 md:mt-6 bg-gray-50 border-t-2 border-gray-200 sm:px-10">
                    <p className="text-xs leading-5 text-gray-500">
                      By signing up, you agree to our Terms , Data Policy and{" "}
                      Cookies Policy .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
