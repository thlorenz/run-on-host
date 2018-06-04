'use strict'

const { spawn } = require('child-process-promise')
const sshCommand = require('./lib/ssh-command')

/**
 * Attempts to run the given command on the supplied ansible host via `ssh`.
 * Determines user, hostname and port from the ansible-inventory.
 *
 * @param {String} cmd command to fun, i.e. `ls -la /var/log`
 * @param {String} host the ansible host to run the command on
 * @param {Object} $0 options
 * @param {String} [$0.ansibleRoot=cwd] the root directory, i.e. where the `ansible.cfg` file lives
 * @param {Boolean} [$0.pipe=true] if `true` pipes command output to stdout/stderr
 * @return {Promise} that resolves once command completed or rejects if something goes wrong
 */
async function runOnHost(cmd, host, { ansibleRoot, pipe = true } = {}) {
  const fullCommand = await sshCommand(cmd, host, ansibleRoot)
  const parts = fullCommand.split(' ')
  const command = parts[0]
  const args = parts.slice(1)
  const promise = spawn(command, args, { cwd: ansibleRoot })
  if (pipe) {
    const { childProcess } = promise
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stderr)
  }
  return promise
}

module.exports = runOnHost
