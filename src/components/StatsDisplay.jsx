import React, { useState, useEffect } from 'react';
import {TbTruckDelivery} from "react-icons/tb";
import {RiSeedlingLine} from "react-icons/ri";
import {BsCart4} from "react-icons/bs";

export default function StatsDisplay(props) {

    const {cropData} = props;
    const [crop, setCrop] = useState('Bitter Gourd');
    const [category, setCategory] = useState('Vegetables (L)');
    const [supply, setSupply] = useState('100');
    const [demand, setDemand] = useState('200');


    useEffect(() => {
        const interval = setInterval(() => {
            const item = cropData[Math.floor(Math.random()*cropData.length)];
            setCategory(item.category);
            const type = item.types[Math.floor(Math.random()*item.types.length)];
            setCrop(type.name);
            setSupply(type.supply);
            setDemand(type.demand);

        }, 3000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div>
            <dl className="w-full mt-5 grid grid-cols-1 rounded-lg overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0">
                {/*crop section*/}
                <div
                    className="relative bg-stone-100 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
                >
                    <dt>
                        <div className="absolute bg-emerald-500 rounded-md p-3">
                            <RiSeedlingLine className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                        <p className="ml-16 text-sm font-medium text-gray-500 truncate">Crop</p>
                    </dt>
                    <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                        <p className="text-2xl font-semibold text-gray-900">{crop}</p>
                        <p className="text-green-600 ml-2 flex items-baseline text-sm font-semibold">
                            {category}
                        </p>
                    </dd>
                </div>
                {/*supply section*/}
                <div
                    className="relative bg-stone-50 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
                >
                    <dt>
                        <div className="absolute bg-lime-600 rounded-md p-3">
                            <TbTruckDelivery className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                        <p className="ml-16 text-sm font-medium text-gray-500 truncate">Supply</p>
                    </dt>
                    <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                        <p className="text-2xl font-semibold text-gray-900">{supply} kg</p>
                        <p className="text-green-600 ml-2 flex items-baseline text-sm font-semibold">
                            {category}
                        </p>
                    </dd>
                </div>
                {/*demand section*/}
                <div
                    className="relative bg-stone-100 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
                >
                    <dt>
                        <div className="absolute bg-amber-400 rounded-md p-3">
                            <BsCart4 className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                        <p className="ml-16 text-sm font-medium text-gray-500 truncate">Demand</p>
                    </dt>
                    <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                        <p className="text-2xl font-semibold text-gray-900">{demand} kg</p>
                        <p className="text-green-600 ml-2 flex items-baseline text-sm font-semibold">
                            {category}
                        </p>
                    </dd>
                </div>
            </dl>
        </div>
    )
}
