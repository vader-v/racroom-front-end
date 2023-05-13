// components
import profileIcon from '../../assets/icons/profile.png'

// css
import styles from './AuthorInfo.module.css'

const AuthorInfo = (props) => {
  const { content } = props

  // const photo = content.author.photo ? content.author.photo : profileIcon

  return (
    <div className={styles.container}>
      <section>
        {/* <h4>{content.author.name}</h4> */}
        <h4>{content.author}</h4>
      </section>
    </div>
  )
}

export default AuthorInfo