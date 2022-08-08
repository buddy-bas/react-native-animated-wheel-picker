import {
  View,
  StyleSheet,
  ViewProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React from 'react';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandlerGestureEvent,
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { snapPoint } from 'react-native-redash';
import MaskedView from '@react-native-masked-view/masked-view';

export type PickerData = {
  title: string;
  value: any;
};
export type PickerProps = ViewProps & {
  itemHeight?: number;
  pickerData: PickerData[];
  initialIndex?: number;
  visible?: number;
  textStyle?: StyleProp<TextStyle>;
  maskedComponents?: JSX.Element | JSX.Element[];
  contentContainerStyle?: StyleProp<ViewStyle>;
  onSelected: (data: PickerData, index: number) => void;
};
const Picker = ({
  itemHeight = 30,
  pickerData,
  visible = 5,
  textStyle,
  maskedComponents,
  contentContainerStyle,
  initialIndex = 0,
  onSelected,
  ...props
}: PickerProps) => {
  return (
    <View {...props} style={[styles.container]}>
      <PickerItem
        itemHeight={itemHeight}
        pickerData={pickerData}
        visible={visible}
        textStyle={textStyle ?? {}}
        maskedComponents={maskedComponents}
        contentContainerStyle={contentContainerStyle}
        initialIndex={initialIndex}
        onSelected={onSelected}
      />
    </View>
  );
};

type PickerItemProps = Required<
  Pick<
    PickerProps,
    'itemHeight' | 'pickerData' | 'visible' | 'textStyle' | 'initialIndex'
  >
> &
  Pick<
    PickerProps,
    'maskedComponents' | 'onSelected' | 'contentContainerStyle'
  >;

const duration = 1000;
const PickerItem = ({
  itemHeight,
  pickerData,
  visible,
  textStyle,
  maskedComponents,
  contentContainerStyle,
  initialIndex,
  onSelected,
}: PickerItemProps) => {
  const translateY = useSharedValue(-itemHeight * initialIndex);
  const snapPoints = new Array(pickerData.length)
    .fill(0)
    .map((_, i) => i * -itemHeight);

  const timingConfig = {
    duration: duration,
    easing: Easing.bezier(0.35, 1, 0.35, 1),
  };

  const wrapper = (index: number) => {
    onSelected && onSelected(pickerData[index], index);
  };

  const onGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: (_event, ctx) => {
        // @ts-ignore
        ctx.y = translateY.value;
        // triggered at the start of the pan gesture
      },
      onActive: ({ translationY }, ctx) => {
        // @ts-ignore
        translateY.value = translationY + ctx.y;
        // triggered on every frame of the pan gesture
      },
      onEnd: ({ velocityY }) => {
        const snapPointY = snapPoint(translateY.value, velocityY, snapPoints);
        const index = Math.abs(snapPointY / itemHeight);
        translateY.value = withTiming(snapPointY, timingConfig);
        runOnJS(wrapper)(index);
        // triggered at the end of the pan gesture
      },
    });
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <>
      <MaskedView
        androidRenderingMode="software"
        maskElement={
          <View>
            <Animated.View
              style={[
                animatedStyle,
                contentContainerStyle,
                {
                  height: itemHeight * visible,
                  paddingTop: (itemHeight * visible) / 2 - itemHeight / 2,
                },
              ]}
            >
              {pickerData.map((item, index) => (
                <Item
                  key={index}
                  translateY={translateY}
                  index={index}
                  itemHeight={itemHeight}
                  visible={visible}
                  data={item}
                  textStyle={textStyle}
                />
              ))}
            </Animated.View>
          </View>
        }
      >
        {maskedComponents ? (
          maskedComponents
        ) : (
          <>
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                height: itemHeight * Math.trunc(visible / 2),
                backgroundColor: 'grey',
              }}
            />

            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ height: itemHeight, backgroundColor: 'white' }}
            />
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                height: itemHeight * Math.trunc(visible / 2),
                backgroundColor: 'grey',
              }}
            />
          </>
        )}
      </MaskedView>
      <GestureHandlerRootView style={StyleSheet.absoluteFillObject}>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flex: 1,
            }}
          />
        </PanGestureHandler>
      </GestureHandlerRootView>
    </>
  );
};

type ItemProps = {
  translateY: Animated.SharedValue<number>;
  index: number;
  data: PickerData;
} & Required<Pick<PickerProps, 'itemHeight' | 'visible'>> &
  Pick<PickerProps, 'textStyle'>;
const Item = ({
  translateY,
  index,
  itemHeight,
  visible,
  data,
  textStyle,
}: ItemProps) => {
  // const y = useDerivedValue(() => translateY.value, [translateY.value]);

  const y = useDerivedValue(() =>
    interpolate(
      translateY.value / -itemHeight,
      [index - visible / 2, index, index + visible / 2],
      [-1, 0, 1],
      Extrapolate.CLAMP
    )
  );

  const textAnimation = useAnimatedStyle(() => {
    return {
      opacity: 1 / (1 + Math.abs(y.value)),
      transform: [
        {
          scale: 1 - 0.1 * Math.abs(y.value),
        },
        {
          perspective: 500,
        },
        {
          rotateX: `${65 * y.value}deg`,
        },
      ],
    };
  });
  return (
    <View style={[styles.textContainer, { height: itemHeight }]}>
      <Animated.Text style={[textAnimation, textStyle]}>
        {data.title}
      </Animated.Text>
    </View>
  );
};

export default Picker;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    flex: 1,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
