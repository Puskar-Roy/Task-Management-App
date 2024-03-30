import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
export default function index() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const handleStatusChange = (value) => setStatusFilter(value);
  const handlePriorityChange = (value) => setPriorityFilter(value);
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const onChange = (event, selectedDate) => {
    if (mode === "stdate") {
      setStartDate(selectedDate);
    } else if (mode === "endate") {
      setEndDate(selectedDate);
    }
    setShow(false);
  };
  return (
    <View className="">
      <View className="w-[70%] mx-auto">
        <View className="mt-10">
          <Text className="text-3xl font-bold text-center">Task Board</Text>
          <View className="flex justify-between items-center gap-4 ">
            <View className="flex mt-10">
              <View className="flex gap-2 mt-[30px] flex-col items-center h-[120px]">
                <Text className="font-bold text-xl text-blue-400">Sort</Text>
                <View className="mt-10 mb-20 flex flex-row gap-2">
                  <View className="bg-gray-300 rounded-xl">
                    <Picker
                      selectedValue={statusFilter}
                      onValueChange={handleStatusChange}
                      style={{
                        width: 130,
                        fontSize: 2,
                      }}
                    >
                      <Picker.Item label="Status" value="All" />
                      <Picker.Item label="Pending" value="Pending" />
                      <Picker.Item label="In Progress" value="In Progress" />
                      <Picker.Item label="Completed" value="Completed" />
                      <Picker.Item label="Deployed" value="Deployed" />
                      <Picker.Item label="Deferred" value="Deferred" />
                    </Picker>
                  </View>
                  <View className="bg-gray-300 rounded-xl">
                    <Picker
                      selectedValue={priorityFilter}
                      onValueChange={handlePriorityChange}
                      style={{
                        width: 130,
                      }}
                    >
                      <Picker.Item label="Priority" value="All" />
                      <Picker.Item label="P0" value="P0" />
                      <Picker.Item label="P1" value="P1" />
                      <Picker.Item label="P2" value="P2" />
                    </Picker>
                  </View>
                </View>
              </View>

              <View className="flex flex-col gap-2 items-center">
                <Text className="font-bold text-xl text-blue-400">Filter</Text>

                <TouchableOpacity
                  className="bg-gray-300 py-3 px-[90px] rounded-xl"
                  onPress={() => showMode("stdate")}
                >
                  <Text>
                    {startDate ? startDate.toLocaleDateString() : "Start Date"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-gray-300 py-3 px-[90px] rounded-xl"
                  onPress={() => showMode("endate")}
                >
                  <Text>
                    {endDate ? endDate.toLocaleDateString() : "End Date"}
                  </Text>
                </TouchableOpacity>
                {show && (
                  <DateTimePicker
                    value={mode === "stdate" ? startDate : endDate}
                    mode={"date"}
                    display="default"
                    onChange={onChange}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
        <View className="text-center mt-[17vh] sm:mt-[30vh]">
          <Text className="text-center">
            No tasks found.{" "}
            <Link href="/addTask" className="text-blue-500">
              Add a new task
            </Link>
          </Text>
        </View>
      </View>
    </View>
  );
}
