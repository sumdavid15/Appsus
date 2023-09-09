import { utilService } from "../../../services/util.service.js";
import { showErrorMsg } from "../../../services/event-bus.service.js";

const { useState } = React

export function TodoList({ isTrash, todos, onChange }) {
    const [newTodo, setNewTodo] = useState('');

    function handleAddTodo() {
        if (isTrash) return showErrorMsg("Can't be edited in the trash")
        if (newTodo.trim() !== '') {
            onChange([...todos, { id: utilService.makeId(), text: newTodo, completed: false }]);
            setNewTodo('');
        }
    };

    function handleToggleTodo(id) {
        if (isTrash) return showErrorMsg("Can't be edited in the trash")
        const index = todos.findIndex(todo => todo.id === id)
        const updatedTodos = [...todos];
        updatedTodos[index].completed = !updatedTodos[index].completed;
        onChange(updatedTodos);
    };

    function handleDeleteTodo(id) {
        if (isTrash) return showErrorMsg("Can't be edited in the trash")
        const index = todos.findIndex(todo => todo.id === id)
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        onChange(updatedTodos);
    };

    return (
        <div>
            <div className="grouped">
                <input
                    type="text"
                    placeholder="Add a new task"
                    value={newTodo}
                    onChange={(e) => {
                        if (isTrash) return showErrorMsg("Can't be edited in the trash")
                        setNewTodo(e.target.value)
                    }}
                />
                <button className="add-todo-list-item" type="button" onClick={handleAddTodo}>Add</button>
            </div>
            <div className="todo-list-container">
                {todos.map(todo => (
                    <div className="todo-item" key={todo.id}>
                        <div className="todo-checkbox-container">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleToggleTodo(todo.id)}
                            />
                            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                                {todo.text}
                            </span>
                        </div>
                        <button className="todo-delete-btn" type="button" onClick={() => handleDeleteTodo(todo.id)}> <i className="fa-solid fa-trash" onClick={() => handleDeleteTodo(todo.id)}></i></button>
                    </div>
                )
                )}
            </div >
        </div>
    );
}