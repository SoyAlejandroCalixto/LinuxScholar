import React from "react"
import './essentials.css'
import { appContext } from "../App"
import { Moon_svg, Sun_svg, Term_svg, Github_svg } from "../svg"

export function Header(props){

    return (
        <header>
            <Term_svg/>
            <a href="https://github.com/SoyAlejandroCalixto/LinuxScholar" target="_blank" rel="noreferrer"><Github_svg/></a>
            <ThemeSwitch/>
        </header>
    )
}

export function ThemeSwitch(props){

    const dataContext = React.useContext(appContext)
    const checkbox = React.useRef()

    React.useEffect(()=>{

        checkbox.current.checked = dataContext.isLightModeOn === false // the switch spawns enabled if the theme is dark

    },[dataContext.isLightModeOn])

    const checked = (e) => {

        if(e.target.checked){
            document.cookie = `theme=dark;expires=Fri, 31 Dec 9999 23:59:59 GMT`
            dataContext.setIsLightModeOn(false)
        }else{
            document.cookie = `theme=light;expires=Fri, 31 Dec 9999 23:59:59 GMT`
            dataContext.setIsLightModeOn(true)
        }

    }

    return(
        <>
            <label className="themeSwitch">
                <input ref={checkbox} onInput={checked} type="checkbox"/>
                <div></div>
                <Moon_svg/>
                <Sun_svg/>
            </label>
        </>
    )
}