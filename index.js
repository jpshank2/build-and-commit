#! /usr/bin/env node

import { program } from "commander";

import build from './commands/build.js'

program
    .command('build')
    .description('Builds react app of provided client and pushes commit message to github after successful build')
    .option('-c, --client <client>', 'The client to build. Points to the Magnify subdirectory')
    .option('-m, --message <message>', 'The commit message for github')
    .action(build)

program.parse()