import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js";

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
        if (!inputValue) return
        onChange({
            ...note, label: [...note.label, inputValue]
        })
        closeInput();
        setInputValue('')
        showSuccessMsg('Label Added')
    };

    const handleMouseLeave = () => {
        if (isInputOpen) {
            closeInput()
            setInputValue('')
        }
    };

    return (
        <div>
            <div className="add-label-btn" title='Add label' onClick={openInput}><i className="fa-solid fa-tag"></i></div>
            {isInputOpen && (
                <div className="modal" style={{ borderRadius: 5 }} onMouseLeave={handleMouseLeave}>
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