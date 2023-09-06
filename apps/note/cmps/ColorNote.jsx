
export function ColorNote({ color, onChange }) {
    return (
        <select value={color} onChange={(e) => onChange(e.target.value)}>
            <option value="#cfc">1</option>
            <option value="#ccf">2</option>
            <option value="#ffc">3</option>
            <option value="rgb(173, 216, 230)">4</option>
        </select>
    )
}