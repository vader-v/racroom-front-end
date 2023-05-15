// components
import profileIcon from '../../assets/icons/profile.png'

// css
import styles from './OwnerInfo.module.css'

const OwnerInfo = (props) => {
  const { content } = props

  const photo = content.owner.photo ? content.owner.photo : profileIcon

  return (
    <div className={styles.container}>
      <img src={photo} alt="User Profile img" />
      <section>
        <h4>
          {content.owner.name}
        </h4>
      </section>
    </div>
  )
}

export default OwnerInfo