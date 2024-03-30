import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { addTask } from "../../store/taskSlice";
import { useDispatch } from "react-redux";

const addTasks = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
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

  const submitForm = () => {
    const formdata = {
      title: title,
      description: desc,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: statusFilter,
      assignee: "Puskar Roy",
      priority: priorityFilter,
    };
    dispatch(addTask(formdata));
    setTitle("");
    setDesc("");
    setStartDate(new Date());
    setEndDate(new Date());
    setStatusFilter("All");
    setPriorityFilter("All");
  };

  return (
    <View className="w-[80%] mx-auto">
      <View className="mt-10">
        <Text className="text-3xl font-bold text-center mb-5">Add Tasks</Text>
        <View className="flex gap-3">
          <View className="flex gap-2  justify-center">
            <Text className="font-bold tracking-wide">TITLE</Text>
            <TextInput
              className="py-[10px] px-5 bg-gray-300 rounded-xl"
              placeholder="Task Title"
              onChangeText={setTitle}
              value={title}
            />
          </View>
          <View className="flex gap-2  justify-center">
            <Text className="font-bold tracking-wide">DESCRIPTION</Text>
            <TextInput
              className="py-[10px] px-5 bg-gray-300 rounded-xl"
              placeholder="Description"
              onChangeText={setDesc}
              value={desc}
            />
          </View>
          <View className="flex gap-2  justify-center">
            <Text className="font-bold tracking-wide uppercase">
              Start Date
            </Text>
            <TouchableOpacity
              className="bg-gray-300 py-3 px-[90px] rounded-xl"
              onPress={() => showMode("stdate")}
            >
              <Text>
                {startDate ? startDate.toLocaleDateString() : "Start Date"}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex gap-2  justify-center">
            <Text className="font-bold tracking-wide uppercase">End Date</Text>
            <TouchableOpacity
              className="bg-gray-300 py-3 px-[90px] rounded-xl"
              onPress={() => showMode("endate")}
            >
              <Text>{endDate ? endDate.toLocaleDateString() : "End Date"}</Text>
            </TouchableOpacity>
          </View>
          {show && (
            <DateTimePicker
              value={mode === "stdate" ? startDate : endDate}
              mode={"date"}
              display="default"
              onChange={onChange}
            />
          )}
          <View className="flex gap-2  justify-center">
            <Text className="font-bold tracking-wide">STATUS</Text>
            <View className="bg-gray-300 rounded-xl">
              <Picker
                selectedValue={statusFilter}
                onValueChange={handleStatusChange}
                style={{
                  width: "100%",
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
          </View>
          <View className="flex gap-2 mb-3   justify-center">
            <Text className="font-bold tracking-wide uppercase">priority</Text>
            <View className="bg-gray-300 rounded-xl">
              <Picker
                selectedValue={priorityFilter}
                onValueChange={handlePriorityChange}
                style={{
                  width: "100%",
                }}
              >
                <Picker.Item label="All Priority" value="All" />
                <Picker.Item label="P0" value="P0" />
                <Picker.Item label="P1" value="P1" />
                <Picker.Item label="P2" value="P2" />
              </Picker>
            </View>
          </View>
          <View className="flex gap-2  justify-center">
            <TouchableOpacity
              onPress={submitForm}
              className="bg-blue-500 rounded-xl py-[10px] px-5"
            >
              <Text className="text-center text-white uppercase">Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default addTasks;
