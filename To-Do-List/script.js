document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');
  const completedCount = document.getElementById('completed-count');
  const totalCount = document.getElementById('total-count');
  const progressBar = document.querySelector('.progress');

  const updateProgress = () => {
    const total = taskList.children.length;
    const completed = [...taskList.children].filter(li => li.querySelector('.checkbox').checked).length;

    completedCount.textContent = completed;
    totalCount.textContent = total;

    const percent = total > 0 ? (completed / total) * 100 : 0;
    progressBar.style.width = percent + '%';

    if (completed === total && total !== 0) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const createTask = (taskText) => {
    const li = document.createElement('li');

    li.innerHTML = `
      <input type="checkbox" class="checkbox">
      <span>${taskText}</span>
      <div class="task-buttons">
        <button class="edit-btn"><i class="fa fa-pen"></i></button>
        <button class="delete-btn"><i class="fa fa-trash"></i></button>
      </div>
    `;

    // Events
    li.querySelector('.checkbox').addEventListener('change', updateProgress);

    li.querySelector('.delete-btn').addEventListener('click', () => {
      li.remove();
      updateProgress();
    });

    li.querySelector('.edit-btn').addEventListener('click', () => {
      const span = li.querySelector('span');
      const newText = prompt('Edit your task:', span.textContent);
      if (newText !== null && newText.trim() !== '') {
        span.textContent = newText.trim();
      }
    });

    taskList.appendChild(li);
    updateProgress();
  };

  const addTask = (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
    createTask(taskText);
    taskInput.value = '';
  };

  addTaskBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTask(e);
    }
  });

  updateProgress(); // Initial update
});
