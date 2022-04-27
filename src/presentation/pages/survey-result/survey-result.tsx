import { Footer, Header, Loading } from '@/presentation/components'
import Styles from './survey-result-styles.scss'
import FlipMove from 'react-flip-move'
import React from 'react'

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultwrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Qual é seu framework web favorito?</h2>
        <FlipMove className={Styles.answersList}>
          <li>
            <img src="https://fordevs.herokuapp.com/static/img/logo-react.png" alt="" />
            <span className={Styles.answer}> ReactJS</span>
            <span className={Styles.percent}> 50%</span>
          </li>
          <li className={Styles.active}>
            <img src="https://fordevs.herokuapp.com/static/img/logo-react.png" alt="" />
            <span className={Styles.answer}> ReactJS</span>
            <span className={Styles.percent}> 50%</span>
          </li>
          <li>
            <img src="https://fordevs.herokuapp.com/static/img/logo-react.png" alt="" />
            <span className={Styles.answer}> ReactJS</span>
            <span className={Styles.percent}> 50%</span>
          </li>
        </FlipMove>
        <button>Voltar</button>
        {false && <Loading />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult