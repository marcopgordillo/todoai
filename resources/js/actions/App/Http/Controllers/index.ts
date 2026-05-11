import TodoController from './TodoController'
import Settings from './Settings'

const Controllers = {
    TodoController: Object.assign(TodoController, TodoController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers