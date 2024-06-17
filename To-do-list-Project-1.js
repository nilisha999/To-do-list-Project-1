document.addEventListener('DOMContentLoaded', function () {
    // Get all the IDs from the HTML page
    var inputText = document.getElementById('inputText');
    var openFormButton = document.getElementById('openFormButton2');
    var myPopupTask = document.getElementById('myPopupTask');
    var displayInputText = document.getElementById('displayInputText');
    var dueDateTime = document.getElementById('dueDateTime');
    var closePopupTask = document.getElementById('closePopupTask');
    var taskList = document.getElementById('taskList');
    var completedTaskList = document.getElementById('completedTaskList');
    var updateButton = document.getElementById('updateButton');
    // Get the Id of the Edit Popup Task Div
    var editPopupTask = document.getElementById('editPopupTask');
    var editTaskName = document.getElementById('editTaskName');
    var editDueDateTime = document.getElementById('editDueDateTime');
    var saveEditTaskButton = document.getElementById('saveEditTaskButton');
    // Create an empty array of type Task
    var taskListArr = [];
    // Show task popup dialog box
    openFormButton.addEventListener('click', showTaskPopup);
    function showTaskPopup(event) {
        event.preventDefault();
        if (inputText.value.trim() === '') {
            alert('Please enter a task');
        }
        else {
            // Display the entered task in the popup
            displayInputText.value = inputText.value;
            // Show the popup
            myPopupTask.classList.add('show');
        }
    }
    // Close popup and submit task
    closePopupTask.addEventListener('click', closeTaskPopup);
    function closeTaskPopup(event) {
        event.preventDefault();
        // This will check if both fields are filled or not
        if (displayInputText.value.trim() === '' || dueDateTime.value === '') {
            alert('Please fill in all required fields.');
        }
        else {
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
        taskListArr.forEach(function (Task, index) {
            var taskItem = document.createElement('div');
            // Create a variable for checkbox status
            // Check if the task is completed
            var isChecked = Task.Completed ? 'checked' : '';
            taskItem.innerHTML = "\n      <details>\n        <summary>".concat(Task.taskName, "</summary>\n        <p>\n          <input type=\"checkbox\" ").concat(isChecked, " />\n          <strong>Due Date and Time:</strong> ").concat(new Date(Task.dueDate).toLocaleString(), "\n        </p>\n        <button class=\"editTaskButton\" data-index=\"").concat(index, "\">Edit</button>\n      </details>");
            taskList.appendChild(taskItem);
            // Add the event listener to checkbox
            var checkbox = taskItem.querySelector('input[type="checkbox"]');
            checkbox === null || checkbox === void 0 ? void 0 : checkbox.addEventListener('change', function (event) {
                Task.Completed = event.target.checked;
                alert("Task \"".concat(Task.taskName, "\" completed status: ").concat(Task.Completed));
            });
            // Add the event listener to edit button
            var editButton = taskItem.querySelector('.editTaskButton');
            editButton === null || editButton === void 0 ? void 0 : editButton.addEventListener('click', function (event) {
                var target = event.target;
                var index = parseInt(target.getAttribute('data-index') || '0');
                openEditPopup(index);
            });
            // Make the task list visible
            taskList.classList.remove('hidden');
        });
    }
    // Function to open the edit popup
    function openEditPopup(index) {
        var taskToEdit = taskListArr[index];
        editTaskName.value = taskToEdit.taskName;
        editDueDateTime.value = taskToEdit.dueDate;
        editPopupTask.classList.add('show');
        // Save the task index in a data attribute
        saveEditTaskButton.setAttribute('data-index', index.toString());
    }
    // Close popup and save edited task
    saveEditTaskButton.addEventListener('click', function (event) {
        event.preventDefault();
        var index = parseInt(saveEditTaskButton.getAttribute('data-index') || '0');
        if (editTaskName.value.trim() === '' || editDueDateTime.value === '') {
            alert('For Save Edit task - Please fill in all required fields.');
        }
        else {
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
        var completeTask = taskListArr.filter(function (Task) { return Task.Completed; });
        completeTask.forEach(function (Task) {
            var completedTaskListItem = document.createElement('div');
            completedTaskListItem.classList.add('task-item');
            completedTaskListItem.innerHTML = "<details>\n        <summary>".concat(Task.taskName, "</summary>\n        <p>Task is completed successfully, Well done!!!</p>\n      </details>");
            completedTaskList.appendChild(completedTaskListItem);
        });
        if (completeTask.length > 0) {
            completedTaskList.classList.remove('hidden');
        }
        else {
            completedTaskList.classList.add('hidden');
        }
    }
    updateButton.addEventListener('click', function (event) {
        event.preventDefault();
        updateCompletedTaskList();
    });
});
