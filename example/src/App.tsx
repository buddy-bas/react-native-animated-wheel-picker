/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import Picker, { PickerData } from 'react-native-animated-wheel-picker';

import styles from './App.style';

export const DATA = [
  {
    title: 'January',
    value: 1,
  },
  {
    title: 'February',
    value: 2,
  },
  {
    title: 'March',
    value: 3,
  },
  {
    title: 'April',
    value: 4,
  },
  {
    title: 'May',
    value: 5,
  },
  {
    title: 'June',
    value: 6,
  },
  {
    title: 'July',
    value: 7,
  },
  {
    title: 'August',
    value: 8,
  },
  {
    title: 'September',
    value: 9,
  },
  {
    title: 'October',
    value: 10,
  },
  {
    title: 'November',
    value: 11,
  },
  {
    title: 'December',
    value: 12,
  },
];

export const DATA2 = [
  { title: '2022', value: 1 },
  { title: '2023', value: 2 },
  { title: '2024', value: 3 },
];

const itemHeight = 30;
const visible = 5;

export default function App() {
  const [month, setMonth] = useState<PickerData>();
  const [year, setYear] = useState<PickerData>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Default</Text>
      <View style={styles.pickerContainer}>
        <Picker
          pickerData={DATA}
          textStyle={{ fontSize: 27 }}
          onSelected={(value) => setMonth(value)}
        />
      </View>
      <Text style={styles.title}>Custom component</Text>
      <View style={styles.pickerContainer}>
        <View style={styles.centerHighlight} />
        <Picker
          pickerData={DATA}
          textStyle={{ fontSize: 27 }}
          maskComponents={
            <>
              <View
                style={{
                  height: itemHeight * Math.trunc(visible / 2),
                  backgroundColor: 'yellow',
                }}
              />
              <View style={{ height: itemHeight, backgroundColor: 'red' }} />
              <View
                style={{
                  height: itemHeight * Math.trunc(visible / 2),
                  backgroundColor: 'blue',
                }}
              />
            </>
          }
        />
      </View>
      <Text style={styles.title}>Multiple wheel picker</Text>
      <View style={styles.pickerContainer}>
        <Picker
          contentContainerStyle={{ alignItems: 'flex-end' }}
          pickerData={DATA}
          textStyle={{ fontSize: 27 }}
          onSelected={(value) => setMonth(value)}
        />
        <View style={{ width: 30 }} />
        <Picker
          contentContainerStyle={{ alignItems: 'flex-start' }}
          pickerData={DATA2}
          textStyle={{ fontSize: 27 }}
          onSelected={(value) => setYear(value)}
        />
      </View>
      <Button
        title="show selected item"
        onPress={() =>
          Alert.alert(
            'Item',
            `${JSON.stringify(month)} \n ${JSON.stringify(year)}`
          )
        }
      />
    </View>
  );
}
