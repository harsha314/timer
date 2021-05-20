const hours = document.querySelector('#hours');
const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');
const start = document.querySelector('#start');
const pause = document.querySelector('#pause');

function helper(time) {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time - hours * 3600) / 60);
    let seconds = Math.floor((time - hours * 3600) % 60);
    return [hours, minutes, seconds];
}

function getTime() {
    return [
        parseFloat(hours.value || 0),
        parseFloat(minutes.value || 0),
        parseFloat(seconds.value || 0)
    ];
}

let remTime;
let h, m, s;
let resetFlg, pauseFlg;
let timerId;

start.addEventListener('click', () => {
    if (start.innerHTML == 'Start') {
        start.innerHTML = 'Reset';
        pause.disabled = false;
        resetFlg = 0;
        pauseFlg = 0;
        let time = getTime();
        [h, m, s] = time;
        remTime = (time[0] * 60 + time[1]) * 60 + time[2];
        timerId = setInterval(() => {
            if (remTime > 0) {
                if (resetFlg == 0) {
                    remTime -= 1 - pauseFlg;
                    let curTime = helper(remTime);
                    hours.value = curTime[0];
                    minutes.value = curTime[1];
                    seconds.value = curTime[2];
                } else clearInterval(timerId);
            } else {
                resetFlg = 0;
                pauseFlg = 0;
                pause.innerHTML = 'Pause';
                pause.disabled = true;
                start.innerHTML = 'Start';
                clearInterval(timerId);
            }
        }, 1000);
    } else {
        resetFlg = 1;
        start.innerHTML = 'Start';
        [hours.value, minutes.value, seconds.value] = [h, m, s];
        pause.disabled = true;
    }
});

pause.addEventListener('click', () => {
    if (pause.innerHTML == 'Pause') {
        pause.innerHTML = 'Resume';
        pauseFlg = 1;
    } else {
        pause.innerHTML = 'Pause';
        pauseFlg = 0;
    }
});
