import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js";

const { useState } = React

export function NoteAddTag({ onChange, note }) {
    const [isInputOpen, setIsInputOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    function openInput() {
        setIsInputOpen(true);
    };

    function closeInput() {
        setIsInputOpen(false);
    };

    function handleInputChange(e) {
        setInputValue(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (!inputValue) return
        onChange({
            ...note, label: [...note.label, inputValue]
        })
        closeInput();
        setInputValue('')
        showSuccessMsg('Label Added')
    };

    function handleMouseLeave() {
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
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Enter tag name"
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                            <button style={{ color: 'black' }} type="submit">add</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}