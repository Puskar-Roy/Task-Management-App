import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const TaskCard = ({
    title,
    description,
    startDate,
    endDate,
    status,
    assignee,
    priority,

}) => {
    const getDate = (dateString) => {
        const dateObject = new Date(dateString);
        const currentDate = dateObject.toLocaleDateString();
        return currentDate;
    };
    let startDatee = getDate(startDate);
    let endDatee = getDate(endDate);
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "completed":
                return "bg-green-200 text-green-800";
            case "in progress":
                return "bg-blue-200 text-blue-800";
            case "pending":
                return "bg-yellow-200 text-yellow-800";
            case "deferred":
                return "bg-gray-200 text-gray-800";
            case "deployed":
                return "bg-purple-200 text-purple-800";
            default:
                return "bg-white";
        }
    };
    return (
        <View
            className={` flex flex-col rounded-xl justify-center gap-4 bg-white w-72 max-h-[350px] shadow-xl mb-[10px] mt-[10px] relative left-4`}
        >
            <View
                className={`relative bg-clip-border mt-6 ml-4 mr-4 rounded-lg ${getStatusColor(
                    status
                )} shadow-md h-45`}
            >
                <Text className="font-bold text-center text-xl py-7">{`${title}`}</Text>
            </View>
            <View className="">
                <Text className="text-center font-semibold p-2">{`${description}`}</Text>
                <View className="flex flex-row justify-between py-2 px-4">
                    <View className="flex justify-center flex-col">
                        <Text>Start Date</Text>
                        <Text className="font-light">{`${startDatee}`}</Text>
                    </View>
                    <View className="flex justify-center flex-col">
                        <Text>End Date</Text>
                        <Text className="font-light">{`${endDatee}`}</Text>
                    </View>
                </View>
            </View>
            <View className="footer p-3 flex flex-row items-center justify-between">
                <Text className="font-light text-xs block text-black">Puskar Roy</Text>
                <TouchableOpacity
                    type="button"
                    className={`select-none focus:outline-none shadow-md text-white uppercase font-bold text-xs py-2 px-6 ${getStatusColor(
                        status
                    )} rounded-lg`}
                >
                    <Text className="text-black uppercase font-bold text-xs">
                        {`${status}`}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TaskCard;
