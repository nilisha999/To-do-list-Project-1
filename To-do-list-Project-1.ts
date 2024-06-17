document.addEventListener('DOMContentLoaded', () => {
  // Get all the IDs from the HTML page
  const inputText = document.getElementById('inputText') as HTMLInputElement;
  const openFormButton = document.getElementById(
    'openFormButton2',
  ) as HTMLButtonElement;
  const myPopupTask = document.getElementById('myPopupTask') as HTMLDivElement;
  const displayInputText = document.getElementById(
    'displayInputText',
  ) as HTMLInputElement;
  const dueDateTime = document.getElementById(
    'dueDateTime',
  ) as HTMLInputElement;
  const closePopupTask = document.getElementById(
    'closePopupTask',
  ) as HTMLButtonElement;
  const taskList = document.getElementById('taskList') as HTMLDivElement;
  const completedTaskList = document.getElementById(
    'completedTaskList',
  ) as HTMLDivElement;
  const updateButton = document.getElementById(
    'updateButton',
  ) as HTMLButtonElement;

  // Get the Id of the Edit Popup Task Div
  const editPopupTask = document.getElementById(
    'editPopupTask',
  ) as HTMLDivElement;
  const editTaskName = document.getElementById(
    'editTaskName',
  ) as HTMLInputElement;
  const editDueDateTime = document.getElementById(
    'editDueDateTime',
  ) as HTMLInputElement;
  const saveEditTaskButton = document.getElementById(
    'saveEditTaskButton',
  ) as HTMLButtonElement;

  // Define the type for a task
  interface Task {
    taskName: string;
    dueDate: string;
    Completed: boolean;
  }

  // Create an empty array of type Task
  const taskListArr: Task[] = [];

  // Show task popup dialog box
  openFormButton.addEventListener('click', showTaskPopup);

  function showTaskPopup(event: Event) {
    event.preventDefault();
    if (inputText.value.trim() === '') {
      alert('Please enter a task');
    } else {
      // Display the entered task in the popup
      displayInputText.value = inputText.value;
      // Show the popup
      myPopupTask.classList.add('show');
    }
  }

  // Close popup and submit task
  closePopupTask.addEventListener('click', closeTaskPopup);

  function closeTaskPopup(event: Event) {
    event.preventDefault();

    // This will check if both fields are filled or not
    if (displayInputText.value.trim() === '' || dueDateTime.value === '') {
      alert('Please fill in all required fields.');
    } else {
      alert('Task submitted successfully.');
      myPopupTask.classList.remove('show');

      // Add the task to the array
      taskListArr.push({
        taskName: displayInputText.value,
        dueDate: dueDateTime.value,
        Completed: false,
      });

      // Display the task and due date on the page
      displayTask();

      // Clear the input fields
      inputText.value = '';
      displayInputText.value = '';
      dueDateTime.value = '';
    }
  }

  // Display the Task Name and Due date selected on the form
  function displayTask() {
    // Clear the current list
    taskList.innerHTML = '';
    taskListArr.forEach((Task, index) => {
      const taskItem = document.createElement('div');

      // Create a variable for checkbox status
      // Check if the task is completed
      const isChecked = Task.Completed ? 'checked' : '';

      taskItem.innerHTML = `
      <details>
        <summary>${Task.taskName}</summary>
        <p>
          <input type="checkbox" ${isChecked} />
          <strong>Due Date and Time:</strong> ${new Date(
            Task.dueDate,
          ).toLocaleString()}
        </p>
        <button class="editTaskButton" data-index="${index}">Edit</button>
      </details>`;

      taskList.appendChild(taskItem);

      // Add the event listener to checkbox
      const checkbox = taskItem.querySelector('input[type="checkbox"]');
      checkbox?.addEventListener('change', (event) => {
        Task.Completed = (event.target as HTMLInputElement).checked;
        alert(`Task "${Task.taskName}" completed status: ${Task.Completed}`);
      });

      // Add the event listener to edit button
      const editButton = taskItem.querySelector('.editTaskButton');
      editButton?.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const index = parseInt(target.getAttribute('data-index') || '0');
        openEditPopup(index);
      });

      // Make the task list visible
      taskList.classList.remove('hidden');
    });
  }

  // Function to open the edit popup
  function openEditPopup(index: number) {
    const taskToEdit = taskListArr[index];
    editTaskName.value = taskToEdit.taskName;
    editDueDateTime.value = taskToEdit.dueDate;
    editPopupTask.classList.add('show');

    // Save the task index in a data attribute
    saveEditTaskButton.setAttribute('data-index', index.toString());
  }

  // Close popup and save edited task
  saveEditTaskButton.addEventListener('click', (event) => {
    event.preventDefault();
    const index = parseInt(
      saveEditTaskButton.getAttribute('data-index') || '0',
    );
    if (editTaskName.value.trim() === '' || editDueDateTime.value === '') {
      alert('For Save Edit task - Please fill in all required fields.');
    } else {
      taskListArr[index].taskName = editTaskName.value;
      taskListArr[index].dueDate = editDueDateTime.value;
      alert('Saved New Edited Task Successfully');
      editPopupTask.classList.remove('show');
      displayTask();
    }
  });

  // On click of Update Task Button
  function updateCompletedTaskList() {
    completedTaskList.innerHTML = '<h3>Completed Task List</h3>';
    const completeTask = taskListArr.filter((Task) => Task.Completed);
    completeTask.forEach((Task) => {
      const completedTaskListItem = document.createElement('div');
      completedTaskListItem.classList.add('task-item');
      completedTaskListItem.innerHTML = `<details>
        <summary>${Task.taskName}</summary>
        <p>Task is completed successfully, Well done!!!</p>
      </details>`;
      completedTaskList.appendChild(completedTaskListItem);
    });
    if (completeTask.length > 0) {
      completedTaskList.classList.remove('hidden');
    } else {
      completedTaskList.classList.add('hidden');
    }
  }

  updateButton.addEventListener('click', (event: Event) => {
    event.preventDefault();
    updateCompletedTaskList();
  });
});
