import { createSignal, type Component, createEffect, on, createMemo, type Signal } from 'solid-js';
import { View, Text, type NodeProps, NodeStyles, TextStyles } from '@lightningtv/solid';

export interface InputProps extends NodeProps {
  /**
   * non-reactive index of the current cursor currentPosition
   */
  position?: number;
  placeholder?: string;
  /**
   * signal passed in to represent what change we want to happen in the input
   */
  keyEvents: Signal<string>;

  /**
   * signal passed in to represent the actual value within the input
   */
  valueSignal: Signal<string>;

  /**
   * when true the content will be masked to the user
   */
  password?: boolean;

  /**
   * character to use as a mask when password is true
   */
  mask?: string;
}

const ContainerStyle: NodeStyles = {
  display: 'flex',
  flexBoundary: 'fixed',
  padding: 20,
  width: 450,
  height: 70,
  borderRadius: 8,
  border: {
    color: '#c3c3c3',
    width: 2,
  },
  $focus: {
    border: {
      color: '#FFFFFF',
      width: 2,
    },
  },
};
const TextStyle: TextStyles = {
  fontSize: 46,
  lineHeight: 70,
};

const getformatValueText = (props, value) =>
  (props.password ? (props.mask ?? '').repeat(value.length ?? 0) : value);

const Input: Component<InputProps> = props => {
  const [ value, setValue ] = props.valueSignal ?? createSignal('');
  const [ position, setPosition ] = createSignal(props.position ?? value().length);
  const [ keyEvent, setKeyEvent ] = props.keyEvents ?? createSignal('');
  const formatValueText = createMemo(() => getformatValueText(props, value()));

  const formatInputText = (key: string) => {
    if (key === undefined || key === '')
      return;


    const inputText = value();
    let currentPosition = value().length;
    let newValue = '';
    switch (key.toLowerCase()) {
    case 'bksp':
    case 'delete':
      newValue =
          currentPosition > 0 ?
            inputText.slice(0, currentPosition - 1) + inputText.slice(currentPosition) :
            inputText;
      currentPosition--;
      break;
    case 'done':
      break;
    case 'space':
      newValue =
          currentPosition > 0 ?
            `${inputText.slice(0, currentPosition) } ${ inputText.slice(currentPosition)}` :
            ` ${ inputText}`;
      currentPosition++;
      break;
    case 'clear':
      newValue = '';
      currentPosition = 0;
      break;
    default:
      newValue =
          currentPosition > 0 ?
            inputText.slice(0, currentPosition) + key + inputText.slice(currentPosition) :
            key + inputText;
      currentPosition++;
      break;
    }

    setKeyEvent('');
    setValue(newValue);
    // setPosition(currentPosition);
    return '';
  };

  createEffect(on(keyEvent, formatInputText, { defer: true }));

  function onRight() {
    setPosition(p => Math.max(p + 1, value().length));
    return true;
  }

  function onLeft() {
    setPosition(p => Math.max(p - 1, 0));
    return true;
  }

  return (
    <View {...props} position={position()} onLeft={onLeft} onRight={onRight} style={ContainerStyle}>
      <Text style={TextStyle}>
        {formatValueText() || props.placeholder || ''}
      </Text>
    </View>
  );
};

export default Input;
