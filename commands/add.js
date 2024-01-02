import chalk from 'chalk';
import Conf from 'conf'

const conf = new Conf({projectName: 'todo-list'})

export default function add(task) {
    let todoList = conf.get('todo-list')

    if (!todoList) {
        todoList = []
    }

    todoList.push({
        text: task,
        done: false
    })

    conf.set('todo-list', todoList)

    console.log(chalk.green.bold('Task has been added successfully!'))
}