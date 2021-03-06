import React, {useState, useEffect} from 'react'
import Panel from './Panel';
import { main } from '../templates/script';
import './layout.css';

const Layout = ({ children }) => {
  const [x, setX] = useState(null);
  const [x_matches, setXMatches] = useState(false);

  useEffect(() => {
        var script = null;
        script = document.createElement('script');
        script.textContent = main
        script.async = true;
        script.id = "my_script"
        document.querySelector("#___gatsby").appendChild(script);
  }, [])

  useEffect(() => {
    var xx = x
    xx = window.matchMedia("(max-width: 600px)")
    response(xx)
    xx.addListener(response)
    setX(xx)
    return () => {
      xx.removeListener(response)
      setX(null);
      setXMatches(false);
    }
  }, [x])

  const response = (x) => {
    const pic = document.querySelector(`.pic`);
    const script = document.querySelector('#playArea');
    if (x.matches) { 
        pic.classList.add("small")
        pic.classList.remove("big")
        pic.classList.remove("col")
        pic.classList.remove("l4")
        script.style.display = 'none'
    } else {
        pic.classList.add("col")
        pic.classList.add("l4")
        pic.classList.add("big")
        pic.classList.remove("small")
        script.style.display = 'block'
    }
    setXMatches(x.matches)
  }

  return (
    <div className="body">
      <div className="layoutbody">
        <div style={{width:`100%`}}>
          <div className="row mainbody" style={{margin:0}}>
              <div className="pic col m4 l4 leftt" style={{padding:0, background:`linear-gradient(145deg,#0d1221,#2c3184)`, zIndex:1}}>
                  <canvas id="playArea" className='pic' style={{height:`100%`, width:`100%`, background:`transparent`}}></canvas>
                  <div style={{height:`100%`, width:`100%`, color: `white`, zIndex:10, position:`absolute`, top:0}}>
                      <Panel match={x_matches}/>
                  </div>
              </div>
              <div className="col s12 m8 l8" style={{background:`#f7f9fe`}}>
                {children}
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
