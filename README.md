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

1. Refresh data at a latest time range:

```js
import { useTime } from "use-time-react-hook";

const App = () => {
  const [time] = useTime({ range: "last 1 minutes", interval: "1 sec" });

  useEffect(() => {
    refreshData();
  }, [time]);

  return <div>...</div>;
};
```

2. Just get time:

```js
import { useTime } from "use-time-react-hook";

const Clock = () => {
  const [time] = useTime();

  return <div> Now is ${new Date(time).toString()} </div>;
};
```
