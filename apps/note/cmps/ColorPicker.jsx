function ColorBtn({ currentColor, color, onChange }) {
    return <button
        className={`color-picker-btn ${color === currentColor ? 'selected' : ''}`}
        style={{ backgroundColor: color }}
        onClick={() => onChange(color)}
    >
        {color === currentColor && <i className="fa-solid fa-check"></i>}
    </button>
}


export function ColorPicker({ color, onChange }) {
    return (
        <div className="color-picker">
            <ColorBtn color="#cfc" currentColor={color} onChange={onChange} />
            <ColorBtn color="#ccf" currentColor={color} onChange={onChange} />
            <ColorBtn color="#ffc" currentColor={color} onChange={onChange} />
            <ColorBtn color="#add8e6" currentColor={color} onChange={onChange} />
        </div>
        // <select value={color} onChange={(e) => onChange(e.target.value)}>
        //     <option value="#cfc">1</option>
        //     <option value="#ccf">2</option>
        //     <option value="#ffc">3</option>
        //     <option value="rgb(173, 216, 230)">4</option>
        // </select>
    )
}