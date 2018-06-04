# run-on-host [![build status](https://secure.travis-ci.org/thlorenz/run-on-host.svg?branch=master)](http://travis-ci.org/thlorenz/run-on-host)

Runs a given command on a specific ansible host.

    Usage:

      run-on-host --host=<host> [--root=<ansible root>] <command>

    Example:
      run-on-host --host=vagrant ls -la /var/log

## Installation

    npm install run-on-host

## [API](https://thlorenz.github.io/run-on-host)

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### runOnHost

Attempts to run the given command on the supplied ansible host via `ssh`.
Determines user, hostname and port from the ansible-inventory.

**Parameters**

-   `cmd` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** command to fun, i.e. `ls -la /var/log`
-   `host` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the ansible host to run the command on
-   `$0` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** options
    -   `$0.ansibleRoot` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** the root directory, i.e. where the `ansible.cfg` file lives (optional, default `cwd`)
    -   `$0.pipe` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** if `true` pipes command output to stdout/stderr (optional, default `true`)
-   `$2` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `$2.ansibleRoot`  
    -   `$2.pipe`   (optional, default `true`)

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** that resolves once command completed or rejects if something goes wrong

## License

MIT
