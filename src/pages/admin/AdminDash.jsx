import React, { useState, useEffect } from 'react';
import Barchart from "../../components/Barchart";
import Piechart from "../../components/Piechart";
import StatsDisplay from "../../components/StatsDisplay";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

export default function Dashboard() {

    const printReport = () => {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Supply - Demand Relationship of Crops";
        const headers = [["Category", "Type", "Supply (kg)", "Demand (kg)"]];


        const cropData = staticCategories.reduce((r, {category: category, types}) =>
            types.reduce((t, type) => [...t, {category, ...type}], r),
            []
        );

        const data = cropData.map(crop=> [
            crop.category, crop.name, crop.supply, crop.demand]);


        let content = {
            startY: 50,
            head: headers,
            body: data,
            headStyles :{fillColor : [37, 183, 76]}
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Supply_Demand_Relationship_of_Crops_Report.pdf")
    }

    return <>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">Dashboard</h1>
        <div className="w-7/8 lg:w-7/8 pr-0 lg:px-10 grid justify-items-center">
            <div className="w-full px-6">
                <StatsDisplay cropData={staticCategories}/>
            </div>
            {/*report section*/}
            <div className="w-full px-6 mt-3 center">
                <button onClick={printReport} className="w-full p-1 rounded-lg text-sm text-gray-500 bg-stone-50 hover:bg-stone-200 transition-colors shadow">
                    Report on Supply and Demand
                </button>
            </div>
        </div>
        <div className="w-full overflow-x-hidden flex">
            <main className="w-full flex-grow p-6">
                <div className="flex flex-wrap mt-6">
                    <div className="w-full lg:w-3/4 pr-0 lg:pr-2">
                        <div className="px-6 pt-6 bg-white">
                            <Barchart cropData={staticCategories}/>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/4 pl-0 lg:pl-2 mt-12 lg:mt-0 ">
                        <div className="px-6 pt-14 bg-white">
                            <Piechart cropData={staticCategories}/>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </>
}