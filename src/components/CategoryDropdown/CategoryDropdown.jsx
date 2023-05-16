const CategoryDropdown = ({ value, onChange }) => {
  return (
    <select
      name="category"
      value={value}
      onChange={onChange}
    >
      <option value="">All</option>
      <option value="Keyboard Shortcuts">Keyboard Shortcuts</option>
      <option value="Programming">Programming</option>
      <option value="Pop Culture">Pop Culture</option>
      <option value="History">History</option>
      <option value="Games">Games</option>
      <option value="Languages">Languages</option>
      <option value="Television">Television</option>
    </select>
  )
}

export default CategoryDropdown
