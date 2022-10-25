import React, { useState, useEffect, Fragment } from "react";
import {useNavigate} from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import FormWrapper from "../../components/wrappers/FormWrapper";
import {MdOutlineCancel} from "react-icons/md";
import {AiOutlineEdit, AiOutlineEye} from "react-icons/ai";
import {RiDeleteBin6Line} from "react-icons/ri";
import {toast, ToastContainer} from "react-toastify";
import {Redirect} from 'react-router-dom';
import {RiAddLine} from 'react-icons/ri';
import { updateFarmer } from '../../api/FarmerAPI';
import {ChevronDownIcon} from "@heroicons/react/outline";


const staticCategories = [
    {
        _id: "bc022097-96e1-475a-b3dd-09255580036e",
        category: "Rice",
        types: [
            {
                name: "Naadu",
                supply: 20,
                demand: 50,
                _id: "633fe8af557cda83f8574ae1"
            },
            {
                name: "Samba",
                supply: 10,
                demand: 30,
                _id: "633fef5a5be70cc623e8d593"
            },
            {
                name: "Basmati",
                supply: 20,
                demand: 20,
                _id: "633fefb2437df192068e69ae"
            },
        ],
    },
    {
        _id: "7c1a427f-6318-48f9-a256-91b2fd924aab",
        category: "Grains",
        types: [
            {
                name: "Green gram",
                supply: 30,
                demand: 20,
                _id: "633fe8af12345a83f8574ae1"
            },
            {
                name: "Black gram",
                supply: 5,
                demand: 40,
                _id: "633fef5a5be70cc623e8d593"
            },
            {
                name: "Corn",
                supply: 5,
                demand: 40,
                _id: "633fefb2437df192068e69ae"
            },
        ],
    },
    {
        _id: "7c1a412p-6318-48f9-a256-91b2fd924aab",
        category: "Vegetables(L)",
        types: [
            {
                name: "Pumpkin",
                supply: 10,
                demand: 30,
                _id: "633fe8af12345a83f8574ae1"
            },
            {
                name: "Bitter gourd",
                supply: 10,
                demand: 40,
                _id: "633fef5a5be70cc623e8d593"
            },
            {
                name: "Ladies fingers",
                supply: 20,
                demand: 30,
                _id: "633fefb2437df192068e69ae"
            },
        ],
    },
    {
        _id: "7c1a427f-6124-48f9-a256-91b2fd924aab",
        category: "Vegetables(H)",
        types: [
            {
                name: "Carrot",
                supply: 10,
                demand: 40,
                _id: "633fe8af12345a8123454ae1"
            },
            {
                name: "Cabbage",
                supply: 20,
                demand: 20,
                _id: "6976ef5a5be70cc623e8d593"
            },
            {
                name: "Cauliflower",
                supply: 30,
                demand: 40,
                _id: "633fefb2437df193654e69ae"
            },
        ],
    },
    {
        _id: "7c1a427f-6318-48f9-n678-91b2fd924aab",
        category: "Fruits",
        types: [
            {
                name: "Watermelon",
                supply: 10,
                demand: 40,
                _id: "633fe8af12345a987f574ae1"
            },
            {
                name: "Mango",
                supply: 30,
                demand: 50,
                _id: "633f89ty5be70cc623e8d593"
            },
            {
                name: "Papaya",
                supply: 40,
                demand: 10,
                _id: "633568r2437df192068e69ae"
            },
        ],
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function UpdateFarmer() {

    const [farmer, setFarmer] = useState(JSON.parse(localStorage.getItem('Farmer')));
    const [isSuccess, setIsSuccess] = useState(false);
    const [isAddCategory, setIsAddCategory] = useState(false);
    const [fullName, setFullName] = useState("");
    const [nic , setNic] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [district, setDistrict] = useState("");
    const [province, setProvince] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [hectare,setHectare] = useState("");
    const [categories,setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(staticCategories[0]);


    const navigate = useNavigate;

    const onUpdate = async (farmerId) => {
        if (window.confirm("Do you wish to update farmer?")) {

            const updatedFarmer = {
                fullName,
                NIC:nic,
                gender,
                address,
                district,
                province,
                email,
                contactNumber,
                hectare,
                categories
            };

            await updateFarmer(farmerId, updatedFarmer, setFarmer)
                .then(() => {
                    toast.success("Farmer updated", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setIsSuccess(true);
                    alert('farmer updated!');
                    // navigate('/admin/all-farmers');
                })
                .catch(() => {
                    toast.error("Something went wrong!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
        };
    };

    const onAddCategory = async() => {

        setCategories([...categories, selectedCategory.category])
        console.log(categories);
    }

    const onDeleteCategory = async() => {

        setCategories([...categories].pop());
    }


    useEffect(() => {

        setFullName(farmer.fullName);
        setNic(farmer.NIC);
        setGender(farmer.gender);
        setAddress(farmer.address);
        setDistrict(farmer.district);
        setProvince(farmer.province);
        setEmail(farmer.email);
        setContactNumber(farmer.contactNumber);
        setHectare(farmer.hectare);
        setCategories(farmer.categories);

        if(isSuccess){
            navigate('/admin/all-farmers')
        };

    }, [isSuccess, navigate]);


    return (
        <div>
            <div className="sm:flex sm:items-center my-10">
                <div className="sm:flex-auto mb-3">
                    <h1 className="text-2xl font-semibold text-gray-900">Update Farmer</h1>
                </div>
            </div>
        <FormWrapper>
            <>
                <form className="space-y-8 divide-y divide-gray-200">
                    <div className="space-y-8 divide-y divide-gray-200">
                        <div className="pt-8">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                            </div>
                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="fullName"
                                            id="fullName"
                                            value={fullName}
                                            className="shadow-sm focus:ring-emerald-400 focus:border-emerald-400 block w-full sm:text-sm border-gray-300 rounded-md"
                                            onChange={(e)=>(setFullName(e.target.value))}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-700">
                                        NIC
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="nic"
                                            id="nic"
                                            value={nic}
                                            className="shadow-sm focus:ring-emerald-400 focus:border-emerald-400 block w-full sm:text-sm border-gray-300 rounded-md"
                                            onChange={(e)=>(setNic(e.target.value))}
                                        />
                                    </div>
                                </div>
                                <fieldset className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Gender
                                    </label>
                                    <div className="mt-4 space-y-4 ">
                                        <div className="flex items-center">
                                            <input
                                                id="push-male"
                                                name="push-gender"
                                                type="radio"
                                                value="Male"
                                                className="focus:ring-emerald-400 h-4 w-4 text-emerald-600 border-gray-300"
                                                onChange={(e)=>(setGender(e.target.value))}
                                            />
                                            <label className="ml-3 block text-sm font-medium text-gray-700">
                                                Male
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="push-female"
                                                name="push-gender"
                                                type="radio"
                                                value="Female"
                                                className="focus:ring-emerald-400 h-4 w-4 text-emerald-600 border-gray-300"
                                                onChange={(e)=>(setGender(e.target.value))}
                                            />
                                            <label className="ml-3 block text-sm font-medium text-gray-700">
                                                Female
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>

                            </div>
                        </div>

                        <div className="pt-8">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Location Details</h3>
                            </div>
                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            value={address}
                                            className="shadow-sm focus:ring-emerald-400 focus:border-emerald-400 block w-full sm:text-sm border-gray-300 rounded-md"
                                            onChange={(e)=>(setAddress(e.target.value))}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Districts
                                    </label>
                                    <div className="mt-1">
                                        <select
                                            id="district"
                                            name="district"
                                            value={district}
                                            className="shadow-sm focus:ring-emerald-400 focus:border-emerald-400 block w-full sm:text-sm border-gray-300 rounded-md"
                                            onChange={(e)=>(setDistrict(e.target.value))}
                                        >
                                            <option>Colombo</option>
                                            <option>Gampaha</option>
                                            <option>Kalutara</option>
                                            <option>Kandy</option>
                                            <option>Matale</option>
                                            <option>Nuwara Eliya</option>
                                            <option>Galle</option>
                                            <option>Matara</option>
                                            <option>Hambantota</option>
                                            <option>Jaffna</option>
                                            <option>Kilinochchi</option>
                                            <option>Mannar</option>
                                            <option>Vavuniya</option>
                                            <option>Mullaitivu</option>
                                            <option>Batticaloa</option>
                                            <option>Ampara</option>
                                            <option>Trincomalee</option>
                                            <option>Kurunegala</option>
                                            <option>Puttalam</option>
                                            <option>Anuradhapura</option>
                                            <option>Polonnaruwa</option>
                                            <option>Moneragala</option>
                                            <option>Ratnapura</option>
                                            <option>Kegalle</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Province
                                    </label>
                                    <div className="mt-1">
                                        <select
                                            id="province"
                                            name="province"
                                            placeholder="Farmer's province"
                                            value={province}
                                            className="shadow-sm focus:ring-emerald-400 focus:border-emerald-400 block w-full sm:text-sm border-gray-300 rounded-md"
                                            onChange={(e)=>(setProvince(e.target.value))}
                                        >
                                            <option>Western</option>
                                            <option>Central</option>
                                            <option>Southern</option>
                                            <option>Northern</option>
                                            <option>Eastern</option>
                                            <option>North Western</option>
                                            <option>North Central</option>
                                            <option>Uva</option>
                                            <option>Sabaragamuwa</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="pt-8">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Contact Details</h3>
                            </div>
                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                    <label  className="block text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={email}
                                            className="shadow-sm focus:ring-emerald-400 focus:border-emerald-400 block w-full sm:text-sm border-gray-300 rounded-md"
                                            onChange={(e)=>(setEmail(e.target.value))}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Contact Number
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="tel"
                                            name="number"
                                            id="number"
                                            value={contactNumber}
                                            className="shadow-sm focus:ring-emerald-400 focus:border-emerald-400 block w-full sm:text-sm border-gray-300 rounded-md"
                                            onChange={(e)=>(setContactNumber(e.target.value))}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="pt-8">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Crop Details</h3>
                            </div>
                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                    <label  className="block text-sm font-medium text-gray-700">
                                        Size of Land (Hectare)
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="number"
                                            name="hectare"
                                            id="hectare"
                                            value={hectare}
                                            className="shadow-sm focus:ring-emerald-400 focus:border-emerald-400 block w-full sm:text-sm border-gray-300 rounded-md"
                                            onChange={(e)=>(setHectare(e.target.value))}
                                        />
                                    </div>
                                </div>
                                {/*Category Section*/}
                                <div className="sm:col-span-6">
                                    <label  className="block text-sm font-medium text-gray-700">
                                        Categories
                                    </label>
                                    <table className="min-w-full divide-y rounded-md">
                                        <thead className="bg-white">
                                            <tr>
                                                <th scope="col" className="relative pl-4 pr-3 sm:pr-6">
                                                    <span className="sr-only">Category</span>
                                                </th>
                                                <th scope="col" className="relative pl-4 pr-3 sm:pr-6">
                                                    <span className="sr-only">Action</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                        {categories.length != 0 && (
                                            categories
                                                .map((category) => (
                                                    <>
                                                        <tr key={category}>
                                                            <td className="w-full max-w-0 py-4 pl-4 pr-3 text-gray-500 text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                                                                {category}
                                                            </td>
                                                            {/*<td className="text-right text-sm font-medium sm:pr-6">*/}
                                                            {/*    <button*/}
                                                            {/*        className="flex w-fit text-white bg-red-500 py-1 px-4 rounded-lg hover:bg-red-600 transition-colors"*/}
                                                            {/*        onClick={() => onDeleteCategory()}*/}
                                                            {/*    >*/}
                                                            {/*        <RiDeleteBin6Line*/}
                                                            {/*            className="mt-0 mr-0 md:mt-1 md:mr-1"*/}
                                                            {/*            size={18}*/}
                                                            {/*        />*/}
                                                            {/*    </button>*/}
                                                            {/*</td>*/}
                                                        </tr>
                                                    </>
                                                ))
                                        )}
                                        {categories.length === 0 && (
                                            <Fragment>
                                                <tr>
                                                    <td className="w-full max-w-0 py-4 pl-4 pr-3 text-gray-500 text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                                                        No categories added yet
                                                    </td>
                                                    <td className="w-full max-w-0 py-4 pl-4 pr-3 text-gray-500 text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">

                                                    </td>
                                                </tr>
                                            </Fragment>
                                        )}
                                        {isAddCategory ? (<>
                                            <tr key={farmer._id}>
                                                <td>
                                                    <div className="mt-1">
                                                        {/* dropdown start */}
                                                        <Menu
                                                            as="div"
                                                            className="relative inline-block text-left w-full mt-2 mr-3"
                                                        >
                                                            <div>
                                                                <Menu.Button className="inline-flex py-2 px-5 border border-gray-300 md:mr-0 md:pr-0 w-full rounded-md text-sm font-medium text-gray-700 active:ring-2 active:ring-emerald-400 active:border-0 focus:ring-2 focus:ring-emerald-400 focus:border-0">
                                                                    <div className="text-gray-500 font-normal">
                                                                        {selectedCategory.category}
                                                                    </div>
                                                                    <ChevronDownIcon
                                                                        color="#a3a3a3"
                                                                        className=" ml-0.5 h-5 w-3 absolute right-6"
                                                                        aria-hidden="true"
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
                                                                <Menu.Items className="absolute mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-emerald-400 ring-opacity-5 focus:outline-none overflow-visible z-50">
                                                                    <div className="py-1">
                                                                        {staticCategories.map((crop) => {
                                                                            return (
                                                                                <Menu.Item key={crop._id}>
                                                                                    {({ active }) => (
                                                                                        <a
                                                                                            onClick={() => setSelectedCategory(crop)}
                                                                                            className={classNames(
                                                                                                active
                                                                                                    ? "bg-emerald-50 text-gray-700"
                                                                                                    : "text-gray-700",
                                                                                                "block px-4 py-2 text-sm"
                                                                                            )}
                                                                                        >
                                                                                            {crop.category}
                                                                                        </a>
                                                                                    )}
                                                                                </Menu.Item>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                </Menu.Items>
                                                            </Transition>
                                                        </Menu>
                                                        {/* dropdown end */}
                                                    </div>
                                                </td>
                                                <td>
                                                    <button
                                                        className="ml-6 mb-2 flex w-fit text-white bg-emerald-500 py-1 px-4 rounded-lg hover:bg-emerald-600 transition-colors"
                                                        onClick={() => (setIsAddCategory(false), onAddCategory())}
                                                    >
                                                        <p className="hidden md:block">Add</p>
                                                    </button>
                                                    <button
                                                        className="ml-6 flex w-fit text-white bg-red-500 py-1 px-4 rounded-lg hover:bg-red-600 transition-colors"
                                                        onClick={() => (setIsAddCategory(false))}
                                                    >
                                                        <p className="hidden md:block">Cancel</p>
                                                    </button>
                                                </td>
                                            </tr>
                                        </>) : (<>
                                            <tr>
                                                <td>
                                                    <button
                                                        className="flex w-fit text-white bg-emerald-500 py-1 px-4 rounded-lg hover:bg-green-600 transition-colors"
                                                        onClick={() => setIsAddCategory(true)}

                                                    >
                                                        <RiAddLine
                                                            className="mt-0 mr-0 md:mt-1 md:mr-1 text-white"
                                                            size={18}
                                                        />
                                                        <p className="hidden md:block">Add Category</p>
                                                    </button>
                                                </td>
                                            </tr>
                                        </>)}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/*Buttons to cancel changes and update farmer*/}
                    <div className="grid grid-cols-5 pt-4">
                        {/*Button for cancel function*/}
                        <div className="col-start-4 col-span-1 justify-end flex">
                            <a
                                className="flex min-w-fit bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition-colors"
                                href="/admin/farmer-profile"
                            >
                                <MdOutlineCancel
                                    className="mt-0 mr-0 md:mt-1 md:mr-1"
                                    size={18}
                                />
                                <p className="hidden md:block">Cancel</p>
                            </a>
                        </div>
                        {/*Button to update*/}
                        <div className="col-span-1 justify-center flex">
                            <button
                                className="flex w-fit text-white bg-emerald-500 py-1 px-4 rounded-lg hover:bg-emerald-600 transition-colors"
                                onClick={() => onUpdate(farmer._id)}
                            >
                                <AiOutlineEdit
                                    className="mt-0 mr-0 md:mt-1 md:mr-1"
                                    size={18}
                                />
                                <p className="hidden md:block">Update</p>
                            </button>
                        </div>
                    </div>
                </form>
            </>
        </FormWrapper>
        </div>
    );
};



