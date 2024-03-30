import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSelector } from "react-redux";
import { selectAllTasks } from "../../store/taskSlice";
import TaskCard from "../../components/TaskCard";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function index() {
  const tasks = useSelector(selectAllTasks);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [show, setShow] = useState(false);
  const [toggle, setToggle] = useState(false);
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

  const filteredTasks = tasks.filter((task) => {
    const taskDate = new Date(task.startDate);
    const isDateInRange =
      (!startDate || taskDate >= startDate) &&
      (!endDate || taskDate <= endDate);
    const isStatusMatch =
      statusFilter === "All" || task.status === statusFilter;
    const isPriorityMatch =
      priorityFilter === "All" || task.priority === priorityFilter;
    return isDateInRange && isStatusMatch && isPriorityMatch;
  });
  console.info(tasks)
  console.info(filteredTasks)

  return (
    <View className="bg-gray-200">
      <View className="w-[90%] mx-auto">
        <View className="mt-10">
          <Text className="text-3xl text-indigo-500 font-bold text-center">Task Board</Text>
          <View className="flex items-center justify-between flex-row mt-[30px]">
            <TouchableOpacity
              className="flex bg-indigo-500 p-2 rounded-xl text-white "
              onPress={() => setToggle(!toggle)}
            >
              {toggle ? (
                <Ionicons name="close-sharp" size={20} color="white" />
              ) : (
                <Ionicons name="filter-sharp" size={20} color="white" />
              )}
            </TouchableOpacity>
            <Text className="font-bold text-base text-indigo-500">
              All Tasks ({filteredTasks.length})
            </Text>
          </View>
          <View
            className={`${
              toggle ? "flex" : "hidden"
            } justify-between items-center gap-4 `}
          >
            <View className="flex mt-10">
              <View className="flex gap-2 mt-[30px] flex-col items-center h-[120px]">
                <Text className="font-bold text-xl text-indigo-400">Sort</Text>
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
                      <Picker.Item label="All Status" value="All" />
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
                      <Picker.Item label="All Priority" value="All" />
                      <Picker.Item label="P0" value="P0" />
                      <Picker.Item label="P1" value="P1" />
                      <Picker.Item label="P2" value="P2" />
                    </Picker>
                  </View>
                </View>
              </View>

              <View className="flex flex-col gap-3 items-center">
                <Text className="font-bold text-xl text-indigo-400">Filter</Text>

                <TouchableOpacity
                  className="bg-gray-300 py-3 px-[100px] rounded-xl"
                  onPress={() => showMode("stdate")}
                >
                  <Text>
                    {startDate ? startDate.toLocaleDateString() : "Start Date"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-gray-300 py-3 px-[102px] rounded-xl"
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

        {tasks.length > 0 ? (
          <View className="mt-[20px] relative right-3 w-full">
            <ScrollView
              className="ml-4 "
              style={{
                height: 680,
                width: "100%",
              }}
            >
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  title={task.title}
                  description={task.description}
                  startDate={task.startDate}
                  endDate={task.endDate}
                  status={task.status}
                  assignee={task.assignee}
                  priority={task.priority}
                />
              ))}
            </ScrollView>
          </View>
        ) : (
          <View className="text-center mt-[243.6px]">
            <Text className="text-center">
              No tasks found.{" "}
              <Link href="/addTasks" className="text-indigo-500">
                Add a new task
              </Link>
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
