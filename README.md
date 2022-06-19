# react-native-animated-wheel-picker

A cross-platform wheel picker use Reanimated 2 implementation.

## Features
- Smooth scroll animations
- Custom text style, view style, mask component style
- Animations built by react-native-reanimated

## Installation

```sh
npm install react-native-animated-wheel-picker
```
or
```sh
yarn add react-native-animated-wheel-picker
```
Need to install peer dependencies [`react-native-reanimated`](https://github.com/kmagiera/react-native-reanimated),  [`react-native-gesture-handler`](https://github.com/kmagiera/react-native-gesture-handler), [`@react-native-masked-view/masked-view`](https://github.com/react-native-masked-view/masked-view).

## Usage

```js
import Picker from "react-native-animated-wheel-picker";

// ...
const DATA = [
  { title: '2022', value: 1 },
  { title: '2023', value: 2 },
  { title: '2024', value: 3 },
];

const WheelPicker = () => {
  const [year, setYear] = useState();
  return (
    <View>
      <Picker
        pickerData={DATA}
        textStyle={{ fontSize: 27 }}
        onSelected={(value) => setYear(value)}
      />
    </View>
  );
};
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
