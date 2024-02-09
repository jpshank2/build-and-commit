import chalk from 'chalk';
import path from 'path'
import fs from 'fs'
import { spawn } from 'child_process'

export function changeUp({ level }) {

    if (level === 'react') {
        spawn('cd ..\\..\\..\\..', {
            stdio: 'inherit',
            shell: true
        })
    } else if (level === 'client') {
        spawn('cd ..\\..', {
            stdio: 'inherit',
            shell: true
        })
    } else {
        console.log(chalk.yellow.bold('Not a recognized level, use \'react\' if in the mag-react folder or \'client\' if in the client folder'))
    }
}

export function changeDown({ client }) {

    const cwd = path.basename(process.cwd())

    if (cwd === 'Magnify') {
        spawn(`cd clients\\${client}\\application\\v1\\mag-react`, {
            stdio: 'inherit',
            shell: true
        })
    } else if (cwd === client) {
        spawn(`cd application\\v1\\mag-react`, {
            stdio: 'inherit',
            shell: true
        })
    } else {
        console.log(chalk.red.bold('Not in an acceptable working directory! You need to start in the root Magnify directory or root client directory...'))
    }
}