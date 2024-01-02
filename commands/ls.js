import chalk from 'chalk';
import { exec } from 'child_process'

export default function ls() {
    exec("cd", (error, stdout, stderr) => {
        if (error) {
            console.log(chalk.red.bold(`error: ${error}`))
        }

        if (stdout) {
            console.log(stdout)
        }

        if (stderr) {
            console.log(`stderr: ${stderr}`)
        }
    })
}