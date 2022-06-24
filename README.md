# react-native-animated-wheel-picker
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)
![IOS](https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


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
    <View style={{height:200}}>
      <Picker
        pickerData={DATA}
        textStyle={{ fontSize: 27 }}
        onSelected={(item) => setYear(item)}
      />
    </View>
  );
};
```

## Props

`Inherite ViewProps`

| Name                             | Type                 | Default                        | Description                                                                                                                                |
| -------------------------------- | -------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `pickerData`                     | `{"title":string,"value":any}`              | **REQUIRED**                   | Data for each element "title" key display on picker item                                                                                                                    |
| `itemHeight`                     | `number`             | `30`                          | Height of each picker item                                                                                               |
| `visible`                        | `number`             | `5`                             | Visible item on picker     
| `initialIndex`                        | `number`             | `0`                             | Set initial selected item |
| `maskedComponents`                 | `JSX.Element` or `JSX.Element[]`       | `MaskedComponent`       | The component masked picker view                                                                                              |
| `contentContainerStyle`          | `StyleProp<ViewStyle>`| `undefined`                        | Item view style  
| `textStyle`                      | `StyleProp<TextStyle>`                |      `undefined`                  | Item text style         |
| `onSelected`                     | `({"title":string,"value":any},index:number) => void`           |**REQUIRED**                             |  Callback when user select item that will return element of pickerData array

### `MaskedComponent`

```js
<View>
  <View
    style={{
      height: itemHeight * Math.trunc(visible / 2),
      backgroundColor: 'grey',
    }}
  />

  <View style={{ height: itemHeight, backgroundColor: 'white' }} />
  <View
    style={{
      height: itemHeight * Math.trunc(visible / 2),
      backgroundColor: 'grey',
    }}
  />
</View>;

```
## Credit

- Animation tutor https://www.youtube.com/watch?v=PVSjPswRn0U

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
