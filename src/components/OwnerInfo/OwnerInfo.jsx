// components
import raccoonIcon from '../../assets/icons/raccoon.svg'

// css
import styles from './OwnerInfo.module.css'

const OwnerInfo = (props) => {
  const { content } = props

  const photo = content.owner?.photo || raccoonIcon

  return (
    <div className={styles.container}>
      <section>
        <img src={photo} alt="" />
        <h5>Made by: {content.owner?.name}</h5>
      </section>
    </div>
  )
}

export default OwnerInfo