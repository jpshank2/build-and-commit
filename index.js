#! /usr/bin/env node

import { program } from "commander";

import build from './commands/build.js'
import { changeUp, changeDown } from "./commands/change.js";

program
    .command('build')
    .description('Builds react app of provided client and pushes commit message to github after successful build')
    .option('-c, --client <client>', 'The client to build. Points to the Magnify subdirectory')
    .option('-m, --message <message>', 'The commit message for github')
    .action(build)

program
    .command('up')
    .description('Changes directories up to root Magnify')
    .option('-u, --up <level>', 'Changes directories up based on current level')
    .action(changeUp)

program
    .command('down')
    .description('Changes directories down to application directory')
    .option('-c, --client <client>', 'The client application to change')
    .action(changeDown)

program.parse()