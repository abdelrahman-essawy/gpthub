import React from "react";

const Defualt_Layout = () => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <p className="font-medium text-3xl">Welcome to RAGHUB</p>
            <br/><br/>
            <h1 className="text-3xl font-medium">RAGHUB</h1>
            <br/>
            <p className="font-medium">How can I help you today?</p>

            {/* Centered Grid */}
            <div className="mt-10 grid grid-cols-2 gap-4 justify-items-center ">
                <div className="bg-gray-600 p-4 rounded-xl w-full"><p className="font-medium">General Literature Books ?</p>
                </div>
                <div className="bg-gray-600 p-4 rounded-xl w-full"><p className="font-medium">Classic Literature Books ?</p>
                </div>
                <div className="bg-gray-600 p-4 rounded-xl w-full"><p className="font-medium">Scientific Books ?</p>
                </div>
                <div className="bg-gray-600 p-4 rounded-xl w-full "><p className="font-medium">Programming Books ?</p>
                </div>
            </div>
        </div>
    );
}

export default Defualt_Layout;
