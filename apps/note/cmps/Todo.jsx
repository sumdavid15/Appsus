const { useState } = React

export function TodoList({ todos, onChange }) {
    const [newTodo, setNewTodo] = useState('');

    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
            onChange([...todos, { text: newTodo, completed: false }]);
            setNewTodo('');
        }
    };

    const handleToggleTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].completed = !updatedTodos[index].completed;
        onChange(updatedTodos);
    };

    const handleDeleteTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        onChange(updatedTodos);
    };

    return (
        <div>
            <div class="grouped">
                <input
                    type="text"
                    placeholder="Add a new task"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button type="button" onClick={handleAddTodo}>Add</button>
            </div>
            <div className="todo-list-container">
                {todos.map((todo, index) => (
                    <div className="todo-item" key={index}>
                        <div className="todo-checkbox-container">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleToggleTodo(index)}
                            />
                            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                                {todo.text}
                            </span>
                        </div>
                        <button className="todo-delete-btn" type="button" onClick={() => handleDeleteTodo(index)}> <i className="fa-solid fa-trash" onClick={() => handleDeleteTodo(index)}></i></button>
                    </div>
                ))}
            </div >
        </div>
    );
}