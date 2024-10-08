import {SearchIcon} from "@heroicons/react/solid";
import {BellIcon} from "@heroicons/react/outline";
import {Menu, Transition} from "@headlessui/react";
import {Fragment} from "react";
import { handler } from "@tailwindcss/aspect-ratio";
import { Link } from "react-router-dom";



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function AdminHeader() {

    const onLogout = (e) => {
        localStorage.removeItem("user");
        localStorage.removeItem("userRole");
        localStorage.removeItem('clickedItem')
        window.location.refresh()
    }

    const userNavigation = [
        { name: 'Your Profile', href: '#', handler: ()=> {} },
        { name: 'Settings', href: '#', handler: ()=> {} },
        { name: 'Sign out', href: '/', handler: onLogout },
    ]

    return(
        <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
            </div>
            <div className="ml-4 flex items-center md:ml-6">
                <button
                    type="button"
                    className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                    <div>
                        <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="h-8 w-8 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                    {({ active }) => (
                                        <Link
                                            to={item.href}
                                            className={classNames(
                                                active ? 'bg-gray-100' : '',
                                                'block px-4 py-2 text-sm text-gray-700'
                                            )}
                                            onClick={item.handler}
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    )
}