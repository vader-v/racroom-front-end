// components
import TriviaCard from '../../components/TriviaCard/TriviaCard'

//css
import styles from './TriviaList.module.css'


const TriviaList = (props) => {
  console.log("PROPS,TRIVIAS",props.trivias)
  return (
    <main className={styles.container} >
      {props.trivias.map(trivia => (
        <TriviaCard key={trivia._id} trivia={trivia}/>
      ))}
    </main>
  )
}

export default TriviaList