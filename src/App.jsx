import { useState, useEffect } from 'react'
import btnImage from './assets/images/icon-dice.svg'
import mobileDivider from './assets/images/pattern-divider-mobile.svg'
import desktopDivider from './assets/images/pattern-divider-desktop.svg'

const url = 'https://api.adviceslip.com/advice'

function App() {
  const [loading, setLoading] = useState(true)

  const [advices, setAdvices] = useState('')
  const fetchAdvice = async () => {
    setLoading(true)
    try {
      const resp = await fetch(url)
      const data = await resp.json()
      const adviceData = data.slip

      setLoading(false)
      setAdvices(adviceData)
      console.log(adviceData)
    } catch (error) {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchAdvice()
  }, [])
  const { id, advice } = advices
  return (
    <div className="main">
      <div className="vh-100 container w-auto">
        <div className="row justify-content-center align-items-center h-100  mx-auto text-center">
          <div className="card position-relative col-md-6">
            <h5 className="card-title">ADVICE #{advices.id}</h5>
            <h1 className="card-quote">"{advices.advice}"</h1>
            <picture className="card-divide">
              <source srcSet={desktopDivider} media="(min-width:768px)" />
              <img src={mobileDivider} alt="" />
            </picture>
            <button className="bg-secondary card-btn rounded-circle position-absolute top-100 start-50 translate-middle border-0 p-2">
              {loading ? (
                '...'
              ) : (
                <img src={btnImage} alt="" onClick={fetchAdvice} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
