import React from 'react'
import { Header } from './essentials'

export function Home(props){

    const [keywords, setKeywords] = React.useState([])

    const commands = [ //? keywords with "command" tag
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

    const packagemanagers = [ //? keywords with "package manager" tag
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

    const descs = { //? descriptions
        'sudo': 'Ejecuta un comando con permisos de superusuario',
        'git': 'Usa el popular software de control de versiones Git',
        'neofetch': 'Muestra información actualizada del sistema operativo',
        'pacman': 'Paquetería por defecto en distros basadas en Arch Linux',
        'apt': 'Paquetería por defecto en distros basadas en Debian',
        'apt-get': 'Paquetería por defecto en distros basadas en Debian',
        'dnf': 'Paquetería por defecto en distros basadas en Fedora',
        'yum': 'Paquetería por defecto en distros basadas en Red Hat',
        'yay': 'Asistente para gestionar paquetes de AUR',
        'paru': 'Asistente para gestionar paquetes de AUR',
        'snap': 'Paquetería universal impulsada por Canonical',
        'flatpak': 'Paquetería universal impulsada por Red Hat',
        'zypper': 'Paquetería por defecto en distros basadas en OpenSUSE',
        'cd': 'Cambia de directorio',
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
        'top': 'Muestra los procesos en ejecución',
        'htop': 'Un top mejorado',
        'kill': 'Mata un proceso',
        'killall': 'Mata todos los procesos por nombre',
    }

    const handleInput = (e) => {
        let str = e.target.value;
        let keywords = str.match(/\\?.|^$/g).reduce((p, c) => {
            if(c === '"'){
                p.quote ^= 1;
            }else if(!p.quote && c === ' '){
                p.a.push('');
            }else{
                p.a[p.a.length-1] += c.replace(/\\(.)/,"$1");
            }
            return  p;
        }, {a: ['']}).a
        setKeywords(keywords);
    }

    const evaluateTag = (keyword, index) => {

        if(keyword !== undefined && index !== undefined){

            if(['pacman', 'yay', 'paru'].includes(keywords[index-2]) && keywords[index-1]==='-S') return 'Paquete'
            else if(keywords[index-3] === undefined && [undefined, 'sudo'].includes(keywords[index-2]) && keywords[index-1] === 'git' && keyword === 'clone') return 'Comando'
            else if(keywords[index-3] === undefined && [undefined, 'sudo'].includes(keywords[index-2]) && keywords[index-1] === 'git' && keyword === 'commit') return 'Comando'
            else if(keywords[index-3] === undefined && [undefined, 'sudo'].includes(keywords[index-2]) && keywords[index-1] === 'git' && keyword === 'push') return 'Comando'
            else if(keywords[index-5] === undefined && [undefined, 'sudo'].includes(keywords[index-4]) && keywords[index-3] === 'git' && keywords[index-2] === 'commit' && keywords[index-1] === '-m') return 'Valor'
            else if(keywords[index-4] === undefined && [undefined, 'sudo'].includes(keywords[index-3]) && keywords[index-2] === 'git' && keywords[index-1] === 'clone') return 'Ruta'
            else if(packagemanagers.filter(p=>p!=='pacman'&&p!=='yay'&&p!=='paru').includes(keywords[index-2]) && keywords[index-1]==='install') return `Paquete`
            else if(packagemanagers.includes(keywords[index-2]) && ['-R', '-Rs', '-Rns', '-Rsc', '-Rdd', 'remove', 'purge', 'uninstall'].includes(keywords[index-1])) return 'Paquete'
            else if(keyword[0] === '-') return 'Parámetro'
            else if(evaluateTag(keywords[index-1], index-1) === 'Paquete') return 'Paquete'
            else if(keywords[index-3] === undefined && [undefined, 'sudo'].includes(keywords[index-2]) && ['ls', 'cat', 'cd', 'cp', 'rm', 'mv', 'mkdir', 'rmdir'].includes(keywords[index-1])) return 'Ruta'
            else if(keywords[index-3] === undefined && [undefined, 'sudo'].includes(keywords[index-2]) && ['kill', 'killall'].includes(keywords[index-1])) return 'Valor'
            else if(keywords[index-4] === undefined && [undefined, 'sudo'].includes(keywords[index-3]) && ['kill', 'killall'].includes(keywords[index-2]) && keywords[index-1][0] === '-') return 'Valor'
            else if(keywords[index-4] === undefined && [undefined, 'sudo'].includes(keywords[index-3]) && ['cp', 'mv'].includes(keywords[index-2])) return 'Ruta'
            else if(keywords[index-5] === undefined && [undefined, 'sudo'].includes(keywords[index-4]) && ['cp', 'mv'].includes(keywords[index-3]) && keywords[index-2][0] === '-') return 'Ruta'
            else if(keywords[index-4] === undefined && [undefined, 'sudo'].includes(keywords[index-3]) && ['ls', 'cat', 'cd', 'cp', 'rm', 'mv', 'mkdir', 'rmdir'].includes(keywords[index-2]) && keywords[index-1][0] === '-') return 'Ruta'
            else if(keywords[index-2] === undefined && [undefined, 'sudo'].includes(keywords[index-1]) && commands.includes(keyword)) return 'Comando'
            else if(keywords[index-2] === undefined && [undefined, 'sudo'].includes(keywords[index-1]) && packagemanagers.includes(keyword)) return 'Paquetería'
            else return 'Desconocido'
        }
        else return 'Desconocido'
    }

    const evaluateDesc = (keyword, index) => {

        if(['pacman', 'yay', 'paru'].includes(keywords[index-1]) && keyword==='-S') return `Parámetro para instalar paquetes con ${keywords[index-1]}`
        else if(keywords[index-3] === undefined && [undefined, 'sudo'].includes(keywords[index-2]) && keywords[index-1] === 'git' && keyword === 'clone') return 'Clona el repositorio'
        else if(keywords[index-3] === undefined && [undefined, 'sudo'].includes(keywords[index-2]) && keywords[index-1] === 'git' && keyword === 'commit') return 'Crea un nuevo commit'
        else if(keywords[index-3] === undefined && [undefined, 'sudo'].includes(keywords[index-2]) && keywords[index-1] === 'git' && keyword === 'push') return 'Sube los commits locales al repositorio remoto'
        else if(keywords[index-4] === undefined && [undefined, 'sudo'].includes(keywords[index-3]) && keywords[index-2] === 'git' && keywords[index-1] === 'commit' && keyword === '-m') return 'Parámetro para establecer el mensaje del commit'
        else if(keywords[index-5] === undefined && [undefined, 'sudo'].includes(keywords[index-4]) && keywords[index-3] === 'git' && keywords[index-2] === 'commit' && keywords[index-1] === '-m') return 'Mensaje del commit'
        else if(keywords[index-4] === undefined && [undefined, 'sudo'].includes(keywords[index-3]) && keywords[index-2] === 'git' && keywords[index-1] === 'clone') return 'Ruta del repositorio'
        else if(packagemanagers.filter(p=>p!=='pacman').includes(keywords[index-1]) && keyword==='install') return `Parámetro para instalar paquetes con ${keywords[index-1]}`
        else if(keywords[index-1]==='pacman' && ['-R', '-Rs', '-Rns', '-Rsc', '-Rdd', 'remove', 'purge', 'uninstall'].includes(keyword)) return `Parámetro para desinstalar paquetes con ${keywords[index-1]}`
        else if(['pacman', 'yay', 'paru'].includes(keywords[index-2]) && keywords[index-1]==='-S') return 'Paquete a instalar'
        else if(packagemanagers.filter(p=>p!=='pacman'&&p!=='yay'&&p!=='paru').includes(keywords[index-2]) && keywords[index-1]==='install') return `Paquete a instalar`
        else if(packagemanagers.includes(keywords[index-2],) && ['-R', '-Rs', '-Rns', '-Rsc', '-Rdd', 'remove', 'purge', 'uninstall'].includes(keywords[index-1]) && keyword.length > 0) return 'Paquete a desinstalar'
        else if(keywords[index-1]==='pacman' && ['-Sy', '-Syu'].includes(keyword)) return `Actualiza los paquetes con ${keywords[index-1]}`
        else if(keyword[0] === '-') return 'Parámetro para el comando a ejecutar'
        else if(evaluateTag(keywords[index-1], index-1) === 'Paquete') return `Paquete a instalar`
        else if(keywords[index-3] === undefined && [undefined, 'sudo'].includes(keywords[index-2]) && ['ls', 'cat', 'cd', 'cp', 'rm', 'mv', 'mkdir', 'rmdir'].includes(keywords[index-1])) return 'Ruta de un archivo o directorio'
        else if(keywords[index-3] === undefined && [undefined, 'sudo'].includes(keywords[index-2]) && ['kill', 'killall'].includes(keywords[index-1])) return 'Valor para el comando a ejecutar'
        else if(keywords[index-4] === undefined && [undefined, 'sudo'].includes(keywords[index-3]) && ['kill', 'killall'].includes(keywords[index-2]) && keywords[index-1][0] === '-') return 'Valor para el comando a ejecutar'
        else if(keywords[index-4] === undefined && [undefined, 'sudo'].includes(keywords[index-3]) && ['cp', 'mv'].includes(keywords[index-2])) return 'Ruta de un archivo o directorio'
        else if(keywords[index-5] === undefined && [undefined, 'sudo'].includes(keywords[index-4]) && ['cp', 'mv'].includes(keywords[index-3]) && keywords[index-2][0] === '-') return 'Ruta de un archivo o directorio'
        else if(keywords[index-4] === undefined && [undefined, 'sudo'].includes(keywords[index-3]) && ['ls', 'cat', 'cd', 'cp', 'rm', 'mv', 'mkdir', 'rmdir'].includes(keywords[index-2]) && keywords[index-1][0] === '-') return 'Ruta de un archivo o directorio'
        else if(keywords[index-2] === undefined && [undefined, 'sudo'].includes(keywords[index-1]) && descs[keyword] !== undefined) return descs[keyword]
        else return '¡Lo siento! No he logrado identificar esta palabra clave. Quizá sea un paquete poco casual o un error de sintaxis.'
    }

    return (
        <>
            <Header/>
            <h1>Linux <span>Scholar</span></h1>
            <div className='commandPromptContainer'>
                <span>~</span>
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