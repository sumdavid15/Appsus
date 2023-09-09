import { utilService } from "../../../services/util.service.js";

const { useState } = React

export function TodoList({ todos, onChange }) {
    const [newTodo, setNewTodo] = useState('');

    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
            onChange([...todos, { id: utilService.makeId(), text: newTodo, completed: false }]);
            setNewTodo('');
        }
    };

    const handleToggleTodo = (id) => {
        const index = todos.findIndex(todo => todo.id === id)
        const updatedTodos = [...todos];
        updatedTodos[index].completed = !updatedTodos[index].completed;
        onChange(updatedTodos);
    };

    const handleDeleteTodo = (id) => {
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
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button type="button" onClick={handleAddTodo}>Add</button>
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