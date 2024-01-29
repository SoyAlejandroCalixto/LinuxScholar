import React from 'react'
import { Header } from './essentials'

export function Home(props){

    const [keywords, setKeywords] = React.useState([])

    const commands = [
        'sudo',
        'git',
        'neofetch',
        'ls',
        'pwd',
        'cd',
        'touch',
        'mkdir',
        'rm',
        'rmdir',
        'mv',
        'cp',
        'cat',
        'nano',
        'vim',
        'echo',
        'su',
        'wget',
    ]

    const packagemanagers = [
        'pacman',
        'dnf',
        'apt',
        'yum',
        'apt-get',
        'yay',
        'paru',
        'snap',
        'flatpak',
        'zypper',
    ]

    const descs = {
        'sudo': 'Ejecuta un comando con permisos de superusuario',
        'git': 'Usa el popular software de control de versiones Git',
        'neofetch': 'Muestra información actualizada del sistema operativo',
        'pacman': 'Paquetería por defecto en distros basadas en Arch Linux',
        'apt': 'Paquetería por defecto en distros basadas en Debian',
        'apt-get': 'Paquetería por defecto en distros basadas en Debian',
        'dnf': 'Paquetería por defecto en distros basadas en Fedora',
        'yum': 'Paquetería por defecto en distros basadas en Red Hat',
        'yay': 'Paquetería por defecto en distros basadas en Arch Linux',
        'paru': 'Paquetería por defecto en distros basadas en Arch Linux',
        'snap': 'Paquetería universal impulsada por Canonical',
        'flatpak': 'Paquetería universal impulsada por Red Hat',
        'zypper': 'Paquetería por defecto en distros basadas en OpenSUSE',
        'cp': 'Copia un archivo o directorio de una ruta a otra',
        'rm': 'Elimina un archivo o directorio',
        'rmdir': 'Elimina un directorio',
        'mv': 'Mueve un archivo o directorio de una ruta a otra',
        'cat': 'Muestra el contenido de un archivo',
        'nano': 'Editor de texto basado en terminal',
        'vim': 'Editor de texto basado en terminal',
        'echo': 'Muestra una salida personalizada',
        'touch': 'Crea un archivo',
        'mkdir': 'Crea un directorio',
        'ls': 'Muestra el contenido de un directorio',
        'pwd': 'Muestra el directorio en el que te encuentras actualmente',
        'wget': 'Descarga un archivo a partir de una URL',
        'su': 'Inicia una sesión de terminal como superusuario',
    }

    const handleInput = (e) => {
        setKeywords(e.target.value.split(" "))
    }

    const evaluateTag = (keyword, index) => {

        if(keywords[index-2]==='pacman' && keywords[index-1]==='-S') return 'Paquete'
        else if(keywords[index-3] === undefined && (keywords[index-2] === undefined || keywords[index-2] === 'sudo') && keywords[index-1] === 'git' && keyword === 'clone') return 'Comando'
        else if(packagemanagers.filter(p=>p!=='pacman').includes(keywords[index-2]) && keywords[index-1]==='install') return `Paquete`
        else if(packagemanagers.includes(keywords[index-2]) && ['-R', '-Rs', '-Rns', '-Rsc', '-Rdd', 'remove', 'purge', 'uninstall'].includes(keywords[index-1]) && keyword.length > 0) return 'Paquete'
        else if(keyword[0] === '-') return 'Parámetro'
        else if(keywords[index-2] === undefined && (keywords[index-1] === undefined || keywords[index-1] === 'sudo') && commands.includes(keyword)) return 'Comando'
        else if(keywords[index-2] === undefined && (keywords[index-1] === undefined || keywords[index-1] === 'sudo') && packagemanagers.includes(keyword)) return 'Paquetería'
        else return 'Desconocido'
    }

    const evaluateDesc = (keyword, index) => {

        if(keywords[index-1]==='pacman' && keyword==='-S') return 'Parámetro para instalar paquetes con Pacman'
        else if(keywords[index-3] === undefined && (keywords[index-2] === undefined || keywords[index-2] === 'sudo') && keywords[index-1] === 'git' && keyword === 'clone') return 'Clona el repositorio'
        else if(packagemanagers.filter(p=>p!=='pacman').includes(keywords[index-1]) && keyword==='install') return `Parámetro para instalar paquetes con ${keywords[index-1]}`
        else if(keywords[index-1]==='pacman' && ['-R', '-Rs', '-Rns', '-Rsc', '-Rdd', 'remove', 'purge', 'uninstall'].includes(keyword)) return 'Parámetro para desinstalar paquetes con Pacman'
        else if(keywords[index-2]==='pacman' && keywords[index-1]==='-S') return 'Paquete a instalar'
        else if(packagemanagers.filter(p=>p!=='pacman').includes(keywords[index-2]) && keywords[index-1]==='install') return `Paquete a instalar`
        else if(packagemanagers.includes(keywords[index-2]) && ['-R', '-Rs', '-Rns', '-Rsc', '-Rdd', 'remove', 'purge', 'uninstall'].includes(keywords[index-1]) && keyword.length > 0) return 'Paquete a desinstalar'
        else if(keywords[index-1]==='pacman' && ['-Sy', '-Syu'].includes(keyword)) return 'Actualiza los paquetes con Pacman'
        else if(keyword[0] === '-') return 'Parámetro para el comando anterior'
        else if(keywords[index-2] === undefined && (keywords[index-1] === undefined || keywords[index-1] === 'sudo') && descs[keyword] !== undefined) return descs[keyword]
        else return '¡Lo siento! No he logrado identificar esta palabra clave. Quizá sea un comando propio de una aplicación o un paquete poco casual.'
    }

    return (
        <>
            <Header/>
            <h1>Linux Scholar</h1>
            <div>
                <input onInput={handleInput} type='text' className='commandPrompt' placeholder='Introduce un comando'></input>
            </div>
            {keywords.map((keyword, index) => keyword !== '' && <CommandBubble key={index} titl={keyword} tag={evaluateTag(keyword, index)} desc={evaluateDesc(keyword, index)}/>)}
        </>
    )
}

function CommandBubble(props){

    return(
        <article className='commandBubble' onClick={() => window.open(`https://www.google.com/search?q=${props.titl}`)}>
            <h3>{props.titl}<span className='tag'>{props.tag}</span></h3>
            <p>{props.desc}</p>
        </article>
    )
}