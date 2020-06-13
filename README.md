# useTime react hook

A React hook that makes your component aware of time.

```
npm install use-time-react-hook -S
```

Or

```
yarn add use-time-react-hook
```

Examples:

- Refresh data at a latest time range:

```js
import { useTime } from "use-time-react-hook";

const App = () => {
  const [time] = useTime({ range: "last 1 min", interval: "1 sec" });

  useEffect(() => {
    const {from, to} = time
    
    // refresh data of last 1 minute on each second
    refreshData(from, to);
  }, [time]);

  return <div>...</div>;
};
```

- Just get time: [Demo](https://rudyhuynh.github.io/use-time-react-hook/) [Source](https://github.com/rudyhuynh/use-time-react-hook/blob/master/example/src/App.js)

```js
import { useTime } from "use-time-react-hook";

const Clock = () => {
  const [time] = useTime();

  return <div> Now is ${new Date(time).toString()} </div>;
};
```

## API

#### `useTime({range, interval}): [time, initialTime, duration]`

##### Parameters
- `range` (optional): A string follows `last x y`, where `x` is number, `y` is time unit
- `interval` (optional): A string follows `x y`, where `x` is number, `y` is time unit

##### Returns
- `time` (object|number): If range is defined, `time` is a range with `{from, to}` extracted from the defined range. Otherwise, it is millisecond value returned by `Date#getTime()`
- `initialTime` (number): Millisecond returned by `Date#getTime()` at the begining of calling `useTime()`
- `duration` (number): equal `time - initialTime` 
  
#### Time unit
-  Can be millisecond, sec, min, hour. All supported time units are defined [here](https://github.com/rudyhuynh/use-time-react-hook/blob/master/src/useTime.js#L4)

## LISCENCE
MIT
