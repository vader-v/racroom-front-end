// css
import styles from "./CategoryDropdown.module.css"

const CategoryDropdown = ({ value, onChange }) => {
  return (
    <div className={styles.dropdown}>
      <select name="category" value={value} onChange={onChange}>
        <option value="">All</option>
        <option value="Pop Culture">Pop Culture</option>
        <option value="History">History</option>
        <option value="Games">Games</option>
        <option value="Languages">Languages</option>
        <option value="Television">Television</option>
        <option value="Technology">Technology</option>
        <option value="General Knowledge">General Knowledge</option>
        <option value="Sports">Sports</option>
        <option value="Music">Music</option>
        <option value="Science">Science</option>
        <option value="Fashion">Fashion</option>
        <option value="Politics">Politics</option>
        <option value="Nature">Nature</option>
        <option value="Business">Business</option>
        <option value="Fiction">Fiction</option>
        <option value="Geography">Geography</option>
        <option value="Food & Drink">Food/Drink</option>
        <option value="Brain Teasers">Brain Teasers</option>
        <option value="Mythology & Folklore">Mythology/Folklore</option>
        <option value="Art & Literature">Art/Literature</option>
      </select>
    </div>
  )
}

export default CategoryDropdown
