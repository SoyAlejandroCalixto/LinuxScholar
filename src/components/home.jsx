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
        'sudo': 'Ejecuta un comando con permisos de superusuario;Comando',
        'git': 'Usa el popular software de control de versiones Git;Comando',
        'neofetch': 'Muestra información actualizada del sistema operativo;Comando',
        'pacman': 'Paquetería por defecto en distros basadas en Arch Linux;Paquetería',
        'apt': 'Paquetería por defecto en distros basadas en Debian;Paquetería',
        'apt-get': 'Paquetería por defecto en distros basadas en Debian;Paquetería',
        'dnf': 'Paquetería por defecto en distros basadas en Fedora;Paquetería',
        'yum': 'Paquetería por defecto en distros basadas en Red Hat;Paquetería',
        'yay': 'Asistente para gestionar paquetes de AUR;Paquetería',
        'paru': 'Asistente para gestionar paquetes de AUR;Paquetería',
        'snap': 'Paquetería universal impulsada por Canonical;Paquetería',
        'flatpak': 'Paquetería universal impulsada por Red Hat;Paquetería',
        'zypper': 'Paquetería por defecto en distros basadas en OpenSUSE;Paquetería',
        'cd': 'Cambia de directorio;Comando',
        'cp': 'Copia un archivo o directorio de una ruta a otra;Comando',
        'rm': 'Elimina un archivo o directorio;Comando',
        'rmdir': 'Elimina un directorio;Comando',
        'mv': 'Mueve un archivo o directorio de una ruta a otra;Comando',
        'cat': 'Muestra el contenido de un archivo;Comando',
        'nano': 'Editor de texto basado en terminal;Comando',
        'vim': 'Editor de texto basado en terminal;Comando',
        'echo': 'Muestra una salida personalizada;Comando',
        'touch': 'Crea un archivo;Comando',
        'mkdir': 'Crea un directorio;Comando',
        'ls': 'Muestra el contenido de un directorio;Comando',
        'pwd': 'Muestra el directorio en el que te encuentras actualmente;Comando',
        'wget': 'Descarga un archivo a partir de una URL;Comando',
        'su': 'Inicia una sesión de terminal como superusuario;Comando',
        'top': 'Muestra los procesos en ejecución;Comando',
        'htop': 'Un top mejorado;Comando',
        'kill': 'Mata un proceso;Comando',
        'killall': 'Mata todos los procesos por nombre;Comando',
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

    const evaluateBubble = (keyword, index) => {

        if(keyword !== undefined && index !== undefined){

            if(['pacman', 'yay', 'paru'].includes(keywords[index-1]) && keyword==='-S') return `Parámetro para instalar paquetes con ${keywords[index-1]};Parámetro`
            else if(keywords[index-3] === undefined && [undefined, 'sudo'].includes(keywords[index-2]) && keywords[index-1] === 'git' && keyword === 'clone') return 'Clona el repositorio;Comando'
            else if(keywords[index-3] === undefined && [undefined, 'sudo'].includes(keywords[index-2]) && keywords[index-1] === 'git' && keyword === 'commit') return 'Crea un nuevo commit;Comando'
            else if(keywords[index-3] === undefined && [undefined, 'sudo'].includes(keywords[index-2]) && keywords[index-1] === 'git' && keyword === 'push') return 'Sube los commits locales al repositorio remoto;Comando'
            else if(keywords[index-4] === undefined && [undefined, 'sudo'].includes(keywords[index-3]) && keywords[index-2] === 'git' && keywords[index-1] === 'commit' && keyword === '-m') return 'Parámetro para establecer el mensaje del commit;Parámetro'
            else if(keywords[index-5] === undefined && [undefined, 'sudo'].includes(keywords[index-4]) && keywords[index-3] === 'git' && keywords[index-2] === 'commit' && keywords[index-1] === '-m') return 'Mensaje del commit;Valor'
            else if(keywords[index-4] === undefined && [undefined, 'sudo'].includes(keywords[index-3]) && keywords[index-2] === 'git' && keywords[index-1] === 'clone') return 'Ruta del repositorio;Ruta'
            else if(packagemanagers.filter(p=>p!=='pacman'&&p!=='yay'&&p!=='paru').includes(keywords[index-1]) && keyword==='install') return `Comando para instalar paquetes con ${keywords[index-1]};Comando`
            else if(['pacman', 'yay', 'paru'].includes(keywords[index-1]) && ['-R', '-Rs', '-Rns', '-Rsc', '-Rdd'].includes(keyword)) return `Comando para desinstalar paquetes con ${keywords[index-1]};Comando`
            else if(['pacman', 'yay', 'paru'].includes(keywords[index-2]) && keywords[index-1]==='-S') return 'Nombre de paquete;Paquete'
            else if(packagemanagers.filter(p=>p!=='pacman'&&p!=='yay'&&p!=='paru').includes(keywords[index-2]) && keywords[index-1]==='install') return `Nombre de paquete;Paquete`
            else if(keywords[index-3] === undefined && [undefined, 'sudo'].includes(keywords[index-2]) && ['pacman', 'yay', 'paru'].includes(keywords[index-2],) && ['-R', '-Rs', '-Rns', '-Rsc', '-Rdd'].includes(keywords[index-1])) return 'Nombre de paquete;Paquete'
            else if(keywords[index-3] === undefined && [undefined, 'sudo'].includes(keywords[index-2]) && ['apt', 'apt-get'].includes(keywords[index-1]) && keyword==='update') return 'Actualiza la lista de fuentes en distros basadas en Debian;Comando'
            else if(keywords[index-3] === undefined && [undefined, 'sudo'].includes(keywords[index-2]) && ['apt', 'apt-get'].includes(keywords[index-1]) && keyword==='upgrade') return 'Actualiza los paquetes;Comando'
            else if(keywords[index-3] === undefined && [undefined, 'sudo'].includes(keywords[index-2]) && ['apt', 'apt-get'].includes(keywords[index-1]) && keyword==='remove') return 'Elimina paquetes;Comando'
            else if(keywords[index-3] === undefined && [undefined, 'sudo'].includes(keywords[index-2]) && ['apt', 'apt-get'].includes(keywords[index-1]) && keyword==='purge') return 'Elimina paquetes junto a sus datos;Comando'
            else if(keywords[index-3] === undefined && [undefined, 'sudo'].includes(keywords[index-2]) && ['apt', 'apt-get', 'dnf', 'yum'].includes(keywords[index-1]) && keyword==='autoremove') return 'Elimina paquetes huérfanos;Comando'
            else if(keywords[index-3] === undefined && [undefined, 'sudo'].includes(keywords[index-2]) && ['dnf', 'yum', 'zypper'].includes(keywords[index-1]) && ['update', 'upgrade'].includes(keyword)) return 'Actualiza tus paquetes instalados;Comando'
            else if(keywords[index-3] === undefined && [undefined, 'sudo'].includes(keywords[index-2]) && keywords[index-1]==='pacman' && ['-Sy', '-Syu'].includes(keyword)) return `Actualiza los paquetes con ${keywords[index-1]};Comando`
            else if(keyword[0] === '-') return 'Parámetro para el comando a ejecutar;Parámetro'
            else if(evaluateBubble(keywords[index-1], index-1).split(';')[1] === 'Paquete') return `Nombre de paquete;Paquete`
            else if(keywords[index-3] === undefined && [undefined, 'sudo'].includes(keywords[index-2]) && ['ls', 'cat', 'cd', 'cp', 'rm', 'mv', 'mkdir', 'rmdir'].includes(keywords[index-1])) return 'Ruta de un archivo o directorio;Ruta'
            else if(keywords[index-3] === undefined && [undefined, 'sudo'].includes(keywords[index-2]) && ['kill', 'killall', 'echo'].includes(keywords[index-1])) return 'Valor para el comando a ejecutar;Valor'
            else if(keywords[index-4] === undefined && [undefined, 'sudo'].includes(keywords[index-3]) && ['kill', 'killall'].includes(keywords[index-2]) && keywords[index-1][0] === '-') return 'Valor para el comando a ejecutar;Valor'
            else if(keywords[index-4] === undefined && [undefined, 'sudo'].includes(keywords[index-3]) && ['cp', 'mv'].includes(keywords[index-2])) return 'Ruta de un archivo o directorio;Ruta'
            else if(keywords[index-5] === undefined && [undefined, 'sudo'].includes(keywords[index-4]) && ['cp', 'mv'].includes(keywords[index-3]) && keywords[index-2][0] === '-') return 'Ruta de un archivo o directorio;Ruta'
            else if(keywords[index-4] === undefined && [undefined, 'sudo'].includes(keywords[index-3]) && ['ls', 'cat', 'cd', 'cp', 'rm', 'mv', 'mkdir', 'rmdir'].includes(keywords[index-2]) && keywords[index-1][0] === '-') return 'Ruta de un archivo o directorio;Ruta'
            else if(keywords[index-2] === undefined && [undefined, 'sudo'].includes(keywords[index-1]) && descs[keyword] !== undefined) return descs[keyword]
            else return '¡Lo siento! No he logrado identificar esta palabra clave. Quizá sea un paquete poco casual o un error de sintaxis.;Desconocido'
        }
        else return '¡Lo siento! No he logrado identificar esta palabra clave. Quizá sea un paquete poco casual o un error de sintaxis.;Desconocido'
    }

    return (
        <>
            <Header/>
            <h1>Linux <span>Scholar</span></h1>
            <div className='commandPromptContainer'>
                <span>~</span>
                <input onInput={handleInput} type='text' className='commandPrompt' placeholder='Introduce un comando'></input>
            </div>
            {keywords.map((keyword, index) => keyword !== '' && <CommandBubble key={index} titl={keyword} tag={evaluateBubble(keyword, index).split(';')[1]} desc={evaluateBubble(keyword, index).split(';')[0]}/>)}
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