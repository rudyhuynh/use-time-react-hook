# useTime react hook

A React hook that makes your component aware of time.

Examples:

1. Refresh data at a latest time range:

```js
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
const Clock = () => {
  const [time] = useTime();

  return <div> Now is ${new Date(time).toString()} </div>;
};
```
