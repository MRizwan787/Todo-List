import inquirer from 'inquirer';

interface Todo {
  text: string;
  isCompleted: boolean;
}

const todos: Todo[] = [];

const mainMenu = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['Add a new task', 'List all tasks', 'Toggle task status', 'Quit'],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case 'Add a new task':
          addTodo();
          break;
        case 'List all tasks':
          listTodos();
          break;
        case 'Toggle task status':
          toggleTodoStatus();
          break;
        case 'Quit':
          console.log('Goodbye!');
          break;
      }
    });
};

const addTodo = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'text',
        message: 'Enter a new task:',
      },
    ])
    .then((answers) => {
      todos.push({ text: answers.text, isCompleted: false });
      console.log('Task added!');
      mainMenu();
    });
};

const listTodos = () => {
  console.log('--- Your Todos ---');
  todos.forEach((todo, index) => {
    const status = todo.isCompleted ? '✔' : ' ';
    console.log(`${index + 1}. [${status}] ${todo.text}`);
  });
  mainMenu();
};

const toggleTodoStatus = () => {
  inquirer
    .prompt([
      {
        type: 'number',
        name: 'index',
        message: 'Enter the index of the task to toggle status:',
      },
    ])
    .then((answers) => {
      const index = answers.index - 1;
      if (todos[index]) {
        todos[index].isCompleted = !todos[index].isCompleted;
        console.log('Task status toggled.');
      } else {
        console.log('Invalid index. Task not found.');
      }
      mainMenu();
    });
};

mainMenu();
