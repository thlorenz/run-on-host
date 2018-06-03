'use strict'

const path = require('path')
const { promisify } = require('util')
const cp = require('child_process')
const exec = promisify(cp.exec)

function port(host) {
  return host.ansible_port || host.ansible_ssh_port
}

function hostAddress(host) {
  return host.ansible_host || host.ansible_ssh_host
}

function user(host) {
  return host.remote_user || host.ansible_user || host.ansible_ssh_user
}

async function resolveHostGroupInfo(host, ansibleRoot) {
  const { stdout, stderr } = await exec(`ansible-inventory --host=${host}`, { cwd: ansibleRoot })
  if (stderr.length > 0) throw new Error(`ansible error: ${stderr}`)
  return JSON.parse(stdout)
}

async function sshCommand(command, host, ansibleRoot = null) {
  if (ansibleRoot == null) ansibleRoot = process.cwd()
  else ansibleRoot = path.resolve(process.cwd(), ansibleRoot)
  const hostInfo = await resolveHostGroupInfo(host, ansibleRoot)

  const fullCommand = (
    `ssh -p ${port(hostInfo)} `
    + `${user(hostInfo)}@${hostAddress(hostInfo)} `
    + command
  )
  return fullCommand
}

module.exports = sshCommand
