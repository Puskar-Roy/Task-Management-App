import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';



const Sidebar = () => {

  return (
    <View className={`bg-blue-500 h-[100vh]  w-[80px] flex flex-col gap-4 `}>
      <TouchableOpacity className='flex items-center flex-row gap-2 justify-center h-[64px] mt-6'>
        <TouchableOpacity onPress={() => router.push('/')}>
          <FontAwesome5 name="tasks" size={24} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>
      <View className="flex justify-start">
        <View className="py-6 flex flex-col justify-start gap-12">
          <TouchableOpacity onPress={() => router.push('')} className='px-5'>
            <MaterialIcons name="dashboard" size={24} color="white" />

          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/')} className='px-5'>
            <MaterialIcons name="task-alt" size={24} color="white" />

          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/')} className='px-5'>
            <MaterialIcons name="pending-actions" size={24} color="white" />

          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/')} className='px-5  '>
            <FontAwesome6 name="bars-progress" size={24} color="white" />

          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/')} className='px-5 '>
            <MaterialCommunityIcons name="cloud-check" size={24} color="white" />

          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/')} className='px-5 '>
            <MaterialIcons name="access-time-filled" size={24} color="white" />

          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/addTasks')} className='px-5 '>
            <MaterialIcons name="add-task" size={24} color="white" />

          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/allTasks')} className='px-5 '>
            <MaterialIcons name="query-stats" size={24} color="white" />

          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Sidebar;
