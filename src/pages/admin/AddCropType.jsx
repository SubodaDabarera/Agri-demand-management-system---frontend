import React, { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
import FormWrapper from "../../components/wrappers/FormWrapper";
import { createCropType, getCropTypes } from "../../api/AddCropTypeAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import CropModal from '../../components/CropModal';
import { useForm } from "react-hook-form";

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

const AddCropType = () => {
    const [categories, setCategories] = useState(staticCategories);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [newCategory, setNewCategory] = useState('');
    const [newType, setNewType] = useState('');
    const [supply, setSupply] = useState(0.0);
    const [demand, setDemand] = useState(0.0);
    const [isCreationSuccess, setIsCreationSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [crops, setCrops] = useState([]);

    let counter = true;
    let newCrop = {};

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async () => {

        if(selectedCategory._id === 'new-category-1234') {
            newCrop = {category: newCategory, type: newType, supply, demand};
        } else {
            newCrop = {category: selectedCategory.category, type: newType, supply, demand};
        };

        console.log(newCrop);

        await createCropType(
            newCrop,
            setIsCreationSuccess
        )
            .then(() => {
                toast.success("New crop type added", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
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

    useEffect(() => {

        async function retrieveCrops() {
            await getCropTypes(setCategories, setCrops).then(() => {
                console.log('Crops retrieved successfully');
                setSelectedCategory(categories[0]);
                setIsLoading(false);
            });

            setCategories(categories => [...categories, {
                _id: "new-category-1234",
                category: "New Category",
            }]);
            counter = false;

        }
        retrieveCrops();
    },[counter]);

    if(isLoading) {
        return (
            <div>
                <div className="flex justify-center mt-24">
                    <CircularProgress color="success" />
                </div>
            </div>
        )
    }

    return (
        <FormWrapper>
            <>
                <ToastContainer />
                <div className="my-16">
                    <p className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl text-center">Add New Crop</p>

                    <label
                        htmlFor="category"
                        className="block text-base font-medium text-gray-700 mt-6"
                    >
                        Category :
                    </label>

                    {/* dropdown start */}
                    <Menu
                        as="div"
                        className="relative inline-block text-left w-full mt-2"
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
                                    {categories.map((crop, idx) => {
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
                    <div>
                        {selectedCategory._id === 'new-category-1234' ? (
                            <div>
                                <label
                                    htmlFor="location"
                                    className="block text-base font-medium text-gray-700 mt-6"
                                >
                                    New Category :
                                </label>
                                <input
                                    type="text"
                                    {...register("newCategory", {
                                        required: true,
                                        pattern: /^[A-Za-z]+$/
                                    })}
                                    name="newCategory"
                                    id="newCategory"
                                    autoComplete="given-name"
                                    className="mt-2 focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 block w-full shadow-sm sm:text-sm text-gray-600 border-gray-300 rounded-md"
                                    onChange={(event) => {
                                        setNewCategory(event.target.value);
                                    }}
                                />
                                {errors.newType && <p className='text-red-600'>Please check name of new type!</p>}
                            </div>
                        ) : (
                            <div/>
                        )}
                    </div>

                    <label
                        htmlFor="location"
                        className="block text-base font-medium text-gray-700 mt-6"
                    >
                        New Type :
                    </label>
                    <input
                        type="text"
                        {...register("newType", {
                            required: true, pattern: /^[A-Za-z]+$/
                        })}
                        name="newType"
                        id="newType"
                        autoComplete="given-name"
                        className="mt-2 focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 block w-full shadow-sm sm:text-sm text-gray-600 border-gray-300 rounded-md"
                        onChange={(event) => {
                            setNewType(event.target.value);
                        }}
                    />
                    {errors.newType && <p className='text-red-600'>Please check name of new type!</p>}
                    <div className="flex items-center justify-center mt-10">
                        <div
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-emerald-500 hover:bg-emerald-600 transition-colors cursor-pointer"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Submit
                        </div>
                    </div>
                </div>
            </>
            <div className="pt-20">
                <CropModal categories={crops}/>
            </div>
        </FormWrapper>
    );
};

export default AddCropType;
