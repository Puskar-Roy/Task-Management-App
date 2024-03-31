import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { useSelector } from "react-redux";
import { selectAllTasks } from "../../store/taskSlice";
import TaskCard from "../../components/TaskCard";

const deployedTask = () => {
  const ctasks = useSelector(selectAllTasks);
  const tasks = ctasks.filter((task) => task.status === "Deployed");
  return (
    <View className="bg-gray-200 min-h-full">
      <View className="w-[90%] mx-auto">
        <View className="mt-10">
          <Text className="text-3xl text-indigo-500 font-bold text-center">
            Deployed Task
          </Text>

          {tasks.length > 0 ? (
            <View className="mt-[20px] w-[85%] mx-auto">
              <ScrollView
                className=""
                style={{
                  height: 680,
                  width: "100%",
                }}
              >
                {tasks.map((task) => (
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
                No Pending Task tasks found.{" "}
                <Link href="/addTasks" className="text-indigo-500">
                  Add a new task
                </Link>
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default deployedTask;
