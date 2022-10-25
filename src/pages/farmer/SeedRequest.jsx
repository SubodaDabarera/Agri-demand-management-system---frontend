import React, { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
import FormWrapper from "../../components/wrappers/FormWrapper";
import { createSeedRequest } from "../../api/SeedRequestAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCropTypes } from "../../api/AddCropTypeAPI";
import { useNavigate } from "react-router-dom";

const staticCategories = [
  {
    id: "7c1a427f-6318-48f9-a256-91b2fd924aab",
    title: "Seeds",
    types: ["Melon", "Pumpkin", "Black papper", "Sunflower"],
  },
  {
    id: "bc022097-96e1-475a-b3dd-09255580036e",
    title: "Rise",
    types: ["Kalu Heenati", "Keeri Samba", "Pachchaperumal", "Suwandal"],
  },
  {
    id: "baf1cf1b-30e7-42d8-a8d3-fb81720a360c",
    title: "Vegitables",
    types: ["Beetroot", "Carrot", "Kohila", "Potato", "Radish", "Lotus root"],
  },
  {
    id: "a1f6d244-3e91-48ef-b104-08b1328607e9",
    title: "Fruits",
    types: ["Mango", "Papaya", "Pineapple", "Avacado", "Banana"],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SeedRequest = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({category: "Select Category . . ."});
  const [selectedType, setSelectedType] = useState("Select type . . .");
  const [size, setSize] = useState(0.0);
  const [weight, setWeight] = useState(0.0);
  const [location, setLocation] = useState("");
  const [isCreationSuccess, setIsCreationSuccess] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("user"));
  const [isSizeError, setIsSizeError] = useState(false);
  const [isWeightError, setIsWeightError] = useState(false);
  const [isCategoryError, setIsCategoryError] = useState(false)
  const [crops, setCrops] = useState();

  const navigate = useNavigate()

  useEffect(() => {
    if (selectedCategory.types) {
      setSelectedType(selectedCategory.types[0].name);
    }
  }, [selectedCategory]);

  const handleSubmit = async () => {
    if (size <= 0) {
      setIsSizeError(true);
    } else {
      setIsSizeError(false);
    }

    if (weight <= 0) {
      setIsWeightError(true);
    } else {
      setIsWeightError(false);
    }

    console.log(selectedCategory)
    if(selectedCategory.category == 'Select Category . . .'){
      setIsCategoryError(true)
    }
    else{
      setIsCategoryError(false)
    }

    if (size > 0 && weight > 0 && !(selectedCategory.category == 'Select Category . . .')) {
      await createSeedRequest(
        {
          farmerId: userId,
          category: selectedCategory.category,
          type: selectedType,
          sizeOfLand: size,
          weight,
          location,
        },
        setIsCreationSuccess
      )
        .then(() => {
          toast.success("Data added successfully !", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          navigate('/farmer/mySeedRequests')
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
    } else {
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // get categories and types from the db
  useEffect(() => {
    async function getData() {
      await getCropTypes(setCategories, setCrops).then(() =>
        console.log("Execution success")
      );
    }

    getData();
  }, []);

  return (
    <FormWrapper>
      <>
        <ToastContainer />
        <div className="my-16">
          <p className="font-semibold text-2xl text-center">Seed Request</p>

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
                  {categories && (
                    <>
                      {categories.map((item, idx) => {
                        return (
                          <Menu.Item key={item}>
                            {({ active }) => (
                              <a
                                onClick={() => setSelectedCategory(item)}
                                className={classNames(
                                  active
                                    ? "bg-emerald-50 text-gray-700"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {item.category}
                              </a>
                            )}
                          </Menu.Item>
                        );
                      })}
                    </>
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          {/* dropdown end */}

          {isCategoryError && (
            <div className="text-red-500 mt-1 text-sm bg-red-100 pl-2 p-1 font-medium rounded-sm">
              Please select a category
            </div>
          )}
          <label
            htmlFor="type"
            className="block text-base font-medium text-gray-700 mt-6"
          >
            Type :
          </label>

          <Menu
            as="div"
            className="relative inline-block text-left w-full mt-2"
          >
            <div>
              <Menu.Button className="inline-flex py-2 px-5 border border-gray-300 md:mr-0 md:pr-0 w-full rounded-md text-sm font-medium text-gray-700 active:ring-2 active:ring-emerald-400 active:border-0 focus:ring-2 focus:ring-emerald-400 focus:border-0">
                <div className="text-gray-500 font-normal">{selectedType}</div>
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
                  {selectedCategory.types && (
                    <>
                      {selectedCategory.types.map((item, idx) => {
                        return (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                onClick={() => setSelectedType(item.name)}
                                className={classNames(
                                  active
                                    ? "bg-emerald-50 text-gray-700"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        );
                      })}
                    </>
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          <label
            htmlFor="size"
            className="block text-base font-medium text-gray-700 mt-6"
          >
            Size of land (in Hectares) :
          </label>
          <input
            type="text"
            name="size"
            id="size"
            autoComplete="given-name"
            className="mt-2 focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 block w-full shadow-sm sm:text-sm text-gray-600 border-gray-300 rounded-md"
            onChange={(event) => {
              setSize(event.target.value);
            }}
            required
          />

          {isSizeError && (
            <div className="text-red-500 mt-1 text-sm bg-red-100 pl-2 p-1 font-medium rounded-sm">
              Size must have positive value
            </div>
          )}

          <label
            htmlFor="weight"
            className="block text-base font-medium text-gray-700 mt-6"
          >
            Number of Kilograms (Kg) :
          </label>
          <input
            type="text"
            name="weight"
            id="weight"
            autoComplete="given-name"
            className="mt-2 focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 block w-full shadow-sm sm:text-sm text-gray-600 border-gray-300 rounded-md"
            onChange={(event) => {
              setWeight(event.target.value);
            }}
            required
          />

          {isWeightError && (
            <div className="text-red-500 mt-1 text-sm bg-red-100 pl-2 p-1 font-medium rounded-sm">
              Weight must have positive value
            </div>
          )}

          <label
            htmlFor="location"
            className="block text-base font-medium text-gray-700 mt-6"
          >
            Location :
          </label>
          <input
            type="text"
            name="location"
            id="location"
            autoComplete="given-name"
            className="mt-2 focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 block w-full shadow-sm sm:text-sm text-gray-600 border-gray-300 rounded-md"
            onChange={(event) => {
              setLocation(event.target.value);
            }}
          />

          <div className="flex items-center justify-center mt-10">
            <div
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-emerald-500 hover:bg-emerald-600 transition-colors cursor-pointer"
              onClick={handleSubmit}
            >
              Submit
            </div>
          </div>
        </div>
      </>
    </FormWrapper>
  );
};

export default SeedRequest;
