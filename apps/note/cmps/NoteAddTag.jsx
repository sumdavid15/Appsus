const { useState } = React

export function NoteAddTag({ onChange, note }) {
    const [isInputOpen, setIsInputOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const openInput = () => {
        setIsInputOpen(true);
    };

    const closeInput = () => {
        setIsInputOpen(false);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the input value as needed (e.g., save it, submit a form, etc.)
        onChange({
            ...note, [label]: [...label, inputValue]
        })
        console.log(inputValue);
        closeInput();
    };

    return (
        <div>
            <div onClick={openInput}><i className="fa-solid fa-tag"></i></div>
            {isInputOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeInput}>&times;</span>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Enter tag name"
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                            <button type="submit">add</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}