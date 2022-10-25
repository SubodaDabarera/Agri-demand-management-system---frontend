import React, { useState } from 'react';
import Modal from 'react-modal'
import {TbPlant} from "react-icons/tb";

const customStyles = {
    content: {
        position: 'fixed',
        background: 'white',
        width: '80%',
        height: '82%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        padding: '2.5px',
        border: '1px solid black',
    },
};

export default function CropModal(props) {

    const {categories} = props;
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <div>
            <button
                className="flex min-w-fit bg-emerald-100 text-green-900 py-1 px-4 rounded-lg hover:bg-emerald-200 transition-colors"
                onClick={() => setModalIsOpen(true)}
            >
                <TbPlant
                    className="mt-0 mr-0 md:mt-1 md:mr-1"
                    size={18}
                />
                <p className="hidden md:block">View All Crop Categories and Types</p>
            </button>
            <Modal style={customStyles} isOpen={modalIsOpen}>
                <div className="px-4 sm:x-6 lg:px-8">
                    <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Category
                                </th>
                                <th
                                    scope="col"
                                    className="hidden px-3 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                                >
                                    Types
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {categories
                                .map((crop) => (
                                    <tr key={crop._id}>
                                        <td className="w-full max-w-0 py-4 pl-4 pr-3 text-gray-500 text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                                            {crop.category}
                                        </td>
                                        <td className="hidden pl-3 pr-16 py-4 text-sm text-gray-500 lg:table-cell">
                                            {crop.types?.map((type =>
                                                    <ul key={crop.types._id}>
                                                        <li>{type.name}</li>
                                                    </ul>
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <button className="mt-4 ml-5 flex min-w-fit bg-emerald-100 text-green-900 py-1 px-4 rounded-lg hover:bg-emerald-200 transition-colors"
                        onClick={() => setModalIsOpen(false)}
                >
                    Close
                </button>
            </Modal>
        </div>
    )

}

