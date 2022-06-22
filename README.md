# react-native-animated-wheel-picker

A cross-platform wheel picker use Reanimated 2 implementation.

## Preview
<div
align="center"
style="width:100%;">
<img src="https://media.giphy.com/media/FLqrtxwHe3DAAL9Y2Q/giphy.gif"/>
<img src="https://media.giphy.com/media/lQkerbbjkO6OpDVXWz/giphy.gif"/>
</div>


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

## Props

`Inherite ViewProps`

| Name                             | Type                 | Default                        | Description                                                                                                                                |
| -------------------------------- | -------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `pickerData`                     | `array`              | **REQUIRED**                   | Modal show animation                                                                                                                       |
| `itemHeight`                     | `number`             | `300`                          | Timing for the modal show animation (in ms)                                                                                               |
| `visible`                        | `number`             | `5`                             | Modal hide animation                                                                                                                     |
| `maskedComponents`                 | `JSX.Element` or `JSX.Element[]`       | `300`        | Timing for the modal hide animation (in ms)                                                                                               |
| `contentContainerStyle`          | `StyleProp<ViewStyle>`| `undefined`                        | Move the modal up if the keyboard is open  
| `textStyle`                      | `StyleProp<TextStyle>`                | `undefined`                        | Move the modal up if the keyboard is open           |
| `onSelected`                     | `function`           |**REQUIRED**                             | Will use RN `Modal` component to cover the entire screen                                                               |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
