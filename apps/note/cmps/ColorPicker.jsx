function ColorBtn({ currentColor, color, onChange }) {
    return <button type='button'
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
            <ColorBtn color="white" currentColor={color} onChange={onChange} />
            <ColorBtn color="#cfc" currentColor={color} onChange={onChange} />
            <ColorBtn color="#ccf" currentColor={color} onChange={onChange} />
            <ColorBtn color="#ffc" currentColor={color} onChange={onChange} />
            <ColorBtn color="#add8e6" currentColor={color} onChange={onChange} />
        </div>
    )
}