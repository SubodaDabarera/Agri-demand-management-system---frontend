import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
    SpeakerphoneIcon,
    ClipboardCheckIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    MenuAlt2Icon,
    UsersIcon,
    XIcon,
    PlusCircleIcon,
} from '@heroicons/react/outline'


import AdminHeader from "../headers/AdminHeader";
import Dashboard from "../../pages/admin/AdminDash";
import AllFarmers from "../../pages/admin/AllFarmers";
import FarmerProfile from "../../pages/admin/FarmerProfile";
import UpdateFarmer from "../../pages/admin/UpdateFarmer";
import AllRequests from "../../pages/admin/AllRequests";
import ViewSeedRequest from "../../pages/admin/ViewSeedRequest";
import SendMessage from "../../pages/admin/SendMessage";
import AllBuyers from "../../pages/AllBuyers";
import AddBuyer from "../../pages/AddBuyer";
import AddFarmer from "../../pages/AddFarmer";
import UpdateBuyer from "../../pages/UpdateBuyer";
import AddCropType from "../../pages/admin/AddCropType";
import AllAnnouncements from "../../pages/AllAnnouncements";
import AddAnnouncement from "../../pages/AddAnnouncement";
import UpdateAnnouncement from "../../pages/UpdateAnnouncement";

const navigation = [
    { name: 'Dashboard', href: '/admin/dash', icon: HomeIcon, current: true },
    { name: 'All Farmers', href: '/admin/all-farmers', icon: UsersIcon, current: false },
    { name: 'All Buyers', href: '/admin/all-buyers', icon: FolderIcon, current: false },
    { name: 'Seed Requests', href: '/admin/all-seed-requests', icon: ClipboardCheckIcon, current: false },
    { name: 'Buyer Requests', href: '#', icon: InboxIcon, current: false },
    { name: 'Announcements', href: '/admin/all-announcements', icon: SpeakerphoneIcon, current: false },
    { name: 'Add New Crop', href: '/admin/add-crop', icon: PlusCircleIcon, current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function AdminLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
    <>
        <div>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute top-0 right-0 -mr-12 pt-2">
                                    <button
                                        type="button"
                                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <span className="sr-only">Close sidebar</span>
                                        <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </Transition.Child>
                            <div className="flex-shrink-0 flex items-center px-4">
                                <img
                                    className="h-8 w-auto"
                                    src="/dm_image.png"
                                    alt="Admin Panel"
                                />
                                <p className="text-3xl font-semibold tracking-tight text-white sm:text-3xl">admin panel</p>
                            </div>
                            <div className="mt-5 flex-1 h-0 overflow-y-auto">
                                <nav className="px-2 space-y-1">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                            )}
                                        >
                                            <item.icon
                                                className={classNames(
                                                    item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                                                    'mr-4 flex-shrink-0 h-6 w-6'
                                                )}
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </Transition.Child>
                    <div className="flex-shrink-0 w-14" aria-hidden="true">
                        {/* Dummy element to force sidebar to shrink to fit close icon */}
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
                    <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
                        <img
                            className="h-8 w-auto"
                            src="/dm_image.png"
                            alt="Admin Panel"
                        />
                        <p className="text-3xl font-semibold tracking-tight text-white sm:text-3xl">admin panel</p>
                    </div>
                    <div className="flex-1 flex flex-col overflow-y-auto">
                        <nav className="flex-1 px-2 py-4 space-y-1">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                    )}
                                >
                                    <item.icon
                                        className={classNames(
                                            item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                                            'mr-3 flex-shrink-0 h-6 w-6'
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
            <div className="md:pl-64 flex flex-col">
                <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
                    <button
                        type="button"
                        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    {/*Start of Header*/}
                    < AdminHeader/>
                    {/*End of Header*/}
                </div>

                <main className="flex-1">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <Routes>
                                <Route path="/dash" element={<Dashboard />} />
                                <Route path="/all-farmers" element={<AllFarmers />} />
                                <Route path="/farmer-profile" element={<FarmerProfile />} />
                                <Route path="/update-farmer" element={<UpdateFarmer />} />
                                <Route path="/all-seed-requests" element={<AllRequests />} />
                                <Route path="/view-seed-request" element={<ViewSeedRequest />} />
                                <Route path="/send-message" element={<SendMessage />} />
                                <Route path="/all-buyers" element={<AllBuyers />} />
                                <Route path="/all-buyers/add" element={<AddBuyer/>}/>
                                <Route path="/all-farmers/add" element={<AddFarmer/>}/>
                                <Route path="/update-buyer" element={<UpdateBuyer/>}/>

                                <Route path="/add-crop" element={<AddCropType />} />
                                <Route path="/all-announcements" element={<AllAnnouncements/>}/>
                                <Route path="/all-announcements/add" element={<AddAnnouncement/>}/>
                                <Route path="/update-announcement"element={<UpdateAnnouncement/>}/>
                            </Routes>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </>
  );
};
