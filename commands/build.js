import chalk from 'chalk';
import path from 'path'
import fs from 'fs'
import { spawn } from 'child_process'

export default function build({ client, message }) {

    const cwd = path.basename(process.cwd())

    if (cwd === 'Magnify') {
        spawn('npm run build', {
            stdio: 'inherit',
            shell: true,
            cwd: `./clients/${client}/application/v1/mag-react`
        }).on('exit', (code, signal) => {
            if (code === 0 && !signal) {
                fs.copyFile('./setup/staticwebapp.config.json', `./clients/${client}/application/v1/mag-react/build/staticwebapp.config.json`, err => {
                    if (err) throw err;
                })
                spawn('git add . ', {
                    stdio: 'inherit',
                    shell: true
                }).on('exit', (code, signal) => {
                    if (code === 0 && !signal) {
                        spawn(`git commit -m "${message}"`, {
                            stdio: 'inherit',
                            shell: true
                        }).on('exit', (code, signal) => {
                            if (code === 0 && !signal) {
                                spawn('git push', {
                                    stdio: 'inherit',
                                    shell: true
                                }).on('exit', (code, signal) => {
                                    if (code === 0 && !signal) {
                                        console.log(chalk.green.bold('Package built and added to git successfully!'))
                                    } else {
                                        console.log(chalk.red.bold(`git push exited with code ${code} and signal ${signal}`))
                                    }
                                })
                            } else {
                                console.log(chalk.red.bold(`git commit -m "${message}" exited with code ${code} and signal ${signal}`))
                            }
                        })
                    } else {
                        console.log(chalk.red.bold(`git add exited with code ${code} and signal ${signal}`))
                    }
                }).on('error', (code, signal) => {
                    console.log(code)
                    console.log(signal)
                })
            } else {
                console.log(chalk.red.bold('npm run build exited with ' + `code ${code} and signal ${signal}`))
            }
        }).on('error', (code, signal) => {
            console.log(code)
            console.log(signal)
        })
    } else {
        console.log(chalk.red.bold('Not in the correct working directory! You need to start in the root Magnify directory...'))
    }
}