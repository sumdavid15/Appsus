const { useState } = React

export function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');

    const addTask = () => {
        if (task.trim() !== '') {
            setTasks([...tasks, task]);
            setTask('');
        }
    };

    const deleteTask = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    function setTextLine() {

    }

    return (
        <section className='todolist-container'>
            <div>
                <input
                    type="text"
                    placeholder="Add a task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button onClick={addTask}>Add</button>
            </div>
            <div>
                {tasks.map((task, index) => (
                    <div className="todo-list" key={index} style={{ textTransform: 'line-through' }}>
                        <input
                            type="checkbox"
                            checked={true}
                            onChange={(e) => setIsPinned(e.target.checked)}
                        />
                        <div className='todo-list-content'>{task}</div>
                        <div onClick={() => deleteTask(index)}><i className="fa-solid fa-delete-left"></i></div>
                    </div>
                ))}
            </div>
        </section>
    );
};



