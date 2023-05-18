// components
import profileIcon from '../../assets/icons/profile.png'
import raccoonIcon from '../../assets/icons/raccoon.svg'

// css
import styles from './OwnerInfo.module.css'

const OwnerInfo = (props) => {
  const { content } = props

  const photo = content.owner?.photo || raccoonIcon
  const ownerName = content.owner?.name || "Unknown Owner"

  return (
    <div className={styles.container}>
      <section>
        <h4>name: {ownerName}</h4>
        
        <img src={photo} alt="" />
      </section>
    </div>
  )
}

export default OwnerInfo