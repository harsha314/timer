import { useEffect, useState } from "react";

export default function Timer() {
  const [state, setState] = useState(() => ({
    hours: 0,
    minutes: 0,
    seconds: 0,
    hoursLeft: 0,
    minutesLeft: 0,
    secondsLeft: 0,
    isStarted: false,
    isPaused: false,
    timerId: null,
  }));

  let onStart = (e) => {
    console.log("button clicked");
    let timerId = setInterval(updateTimeLeft, 1000);
    setState((prevState) => ({
      ...prevState,
      isStarted: true,
      timerId: timerId,
    }));
  };

  let updateTimeLeft = () => {
    setState((prevState) => {
      let timeLeft =
        60 * 60 * prevState.hoursLeft +
        60 * prevState.minutesLeft +
        prevState.secondsLeft;
      timeLeft -= 1;
      let isStarted = true;
      if (timeLeft == 0) {
        clearInterval(prevState.timerId);
        isStarted = false;
      }
      let hours = Math.floor(timeLeft / 3600);
      let minutes = Math.floor((timeLeft % 3600) / 60);
      let seconds = Math.floor(timeLeft % 60);
      --timeLeft;
      return {
        ...prevState,
        isStarted: isStarted,
        hoursLeft: hours,
        minutesLeft: minutes,
        secondsLeft: seconds,
      };
    });
  };

  useEffect(() => {
    if (
      state.hoursLeft == 0 &&
      state.minutesLeft == 0 &&
      state.secondsLeft == 0
    )
      clearInterval(state.timerId);
  }, [state]);

  return (
    <>
      <form>
        <div>
          <label>hour</label>
          <input
            type="number"
            name="hours"
            disabled={state.isStarted}
            value={state.hoursLeft}
            onInput={(e) =>
              setState({
                ...state,
                hours: e.target.value,
                hoursLeft: e.target.value,
              })
            }
          ></input>
        </div>
        <div>
          <label>minutes</label>
          <input
            type="number"
            name="minutes"
            value={state.minutesLeft}
            disabled={state.isStarted}
            onInput={(e) =>
              setState({
                ...state,
                minutes: e.target.value,
                minutesLeft: e.target.value,
              })
            }
          ></input>
        </div>
        <div>
          <label for="seconds">seconds</label>
          <input
            type="number"
            name="seconds"
            value={state.secondsLeft}
            disabled={state.isStarted}
            onInput={(e) =>
              setState({
                ...state,
                seconds: e.target.value,
                secondsLeft: e.target.value,
              })
            }
          ></input>
        </div>
      </form>
      <button disabled={state.isStarted} onClick={onStart}>
        start
      </button>
      {/* <button disabled={!state.isStarted && !state.isPaused}>pause</button>
      <button disabled={state.isStarted && !state.isPaused}>resume</button>
      <button>reset</button> */}
    </>
  );
}
