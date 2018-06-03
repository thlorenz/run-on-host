'use strict'

const test = require('tape')
const path = require('path')
const sshCommand = require('../lib/ssh-command')

test('\nssh-commands: valid hosts', async t => {
  try {
    const ansibleRoot = path.join(__dirname, 'fixtures', 'ansible1')
    {
      const command = await sshCommand('docker stats --all', 'vagrant', ansibleRoot)
      t.equal(command, 'ssh -p 2222 vagrant@localhost docker stats --all', 'command correct')
    }
    {
      const command = await sshCommand('nginx -s reload', 'cloud', ansibleRoot)
      t.equal(command, 'ssh -p 22 gcl@mysite.net nginx -s reload', 'command correct')
    }
  } catch (err) {
    t.iferror(err)
  }

  t.end()
})

test('\nssh-commands: invalid host', async t => {
  try {
    const ansibleRoot = path.join(__dirname, 'fixtures', 'ansible1')
    try {
      await sshCommand('docker stats --all', 'unknown', ansibleRoot)
    } catch (err) {
      t.ok(err.code !== 0, 'non-zero error code')
      t.ok(/Could not match supplied host pattern/.test(err.stderr), 'ansible error message on stderr')
      t.ok(/Command failed/.test(err.message)
        && /Could not match supplied host pattern/.test(err.message)
        , 'informative error message'
      )
    }
  } catch (err) {
    t.iferror(err)
  }

  t.end()
})
