const fs = require("fs").promises;
const filePath = "./tasks.json";
async function readTasks() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch {
    await fs.writeFile(filePath, "[]"); 
    return [];
  }
}
async function writeTasks(tasks) {
  await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
}
async function addTask(task) {
  if (!task || task.trim() === "") {
    console.log("Please enter a valid task.");
    return;
  }
  const tasks = await readTasks();
  tasks.push(task);
  await writeTasks(tasks);
  console.log("Task added:", task);
}
async function listTasks() {
  const tasks = await readTasks();
  if (tasks.length === 0) {
    console.log("No tasks found.");
    return;
  }
  console.log("\nYour Tasks:");
  tasks.forEach((t, i) => console.log(`${i + 1}. ${t}`));
}
async function removeTask(number) {
  const tasks = await readTasks();
  const index = Number(number) - 1;
  if (isNaN(index) || index < 0 || index >= tasks.length) {
    console.log("Invalid task number.");
    return;
  }
  const removed = tasks.splice(index, 1);
  await writeTasks(tasks);
  console.log("Removed:", removed[0]);
}
const command = process.argv[2];
const input = process.argv[3];

async function main() {
  switch (command) {
    case "add":
      await addTask(input);
      break;
    case "list":
      await listTasks();
      break;
    case "remove":
      await removeTask(input);
      break;
    default:
      console.log(`
Commands:
  node app.js add "task"
  node app.js list
  node app.js remove <task-number>
      `);
  }
}

main();
