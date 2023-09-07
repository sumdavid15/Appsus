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
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Add a task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button onClick={addTask}>Add</button>
            </div>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} style={{textTransform: 'line-through'}}>
                        <input
                            type="checkbox"
                            checked={true}
                            onChange={(e) => setIsPinned(e.target.checked)}
                        />
                        {task} <button onClick={() => deleteTask(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};