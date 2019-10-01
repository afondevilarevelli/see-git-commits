#!/usr/bin/env node

const readline = require('readline-sync')
const config = require('./config.json')
const github = require('./helpers')

async function main() {
    var password = readline.question(`Enter password for ${config.username}:\n`, {
        hideEchoBack: true
    });
    
    var user = {
        username: config.username,
        password: password
    }
    
    console.log('Listing last commits...\n')
    
    config.repos.forEach(repository => {
        github.showLastCommit(repository, user)
    })
}

main()