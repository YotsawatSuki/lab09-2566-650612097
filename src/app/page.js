"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Task } from "@/components/Task";
import { TaskInput } from "@/components/TaskInput";
import { nanoid } from "nanoid";
import { useState } from "react";

export default function Home() {
  //tasks = array of {id: string, title: string, completed: boolean}
  const [tasks, setTasks] = useState([]);
  const [countAll, setAll] = useState(0);
  const [countDone, setDone] = useState(0);

  const addTask = (newTaskTitle) => {
    const newTask = { id: nanoid(), title: newTaskTitle, completed: false };
    const newTasks = [...tasks, newTask];
    setAll(countAll + 1);
    setTasks(newTasks);
  };

  const deleteTask = (taskId) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    if (taskToDelete && taskToDelete.completed) {
      setDone(Math.max(countDone - 1, 0));
    }

    const newTasks = tasks.filter((task) => task.id !== taskId);
    setAll(countAll - 1);
    setTasks(newTasks);
  };

  const toggleDoneTask = (taskId) => {
    const newTasks = structuredClone(tasks);
    const task = newTasks.find((x) => x.id === taskId);
    const isTaskCompleted = task.completed;
    task.completed = !task.completed;
    setTasks(newTasks);

    if (task.completed && !isTaskCompleted) {
      setDone(countDone + 1);
    } else if (!task.completed && isTaskCompleted) {
      setDone(Math.max(countDone - 1, 0));
    }
  };

  return (
    // Main container
    <div className="container mx-auto">
      {/* header section */}
      <Header />
      {/* tasks container */}
      <div style={{ maxWidth: "400px" }} className="mx-auto">
        {/* Task summary */}
        <p className="text-center text-secondary fst-italic">
          All ({countAll}) Done ({countDone})
        </p>
        {/* task input */}
        <TaskInput addTaskFunc={addTask} />

        {/* tasks mapping*/}
        {tasks.map((task) => (
          <Task
            id={task.id}
            title={task.title}
            deleteTaskFunc={deleteTask}
            toggleDoneTaskFunc={toggleDoneTask}
            completed={task.completed}
            key={task.id}
          />
        ))}
      </div>

      {/* //footer section */}
      <Footer year="2023" fullName="Yotsawat Sukinee" studentId="650612097" />
    </div>
  );
}
