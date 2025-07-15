import * as s from 'solid-js';
import * as lng from '@lightningtv/solid';
import * as lngp from '@lightningtv/solid/primitives';
import Input from './Input';

const actionKeyContainerStyle: lng.NodeStyles = {
  width: 144,
  alpha: 0.8,
  height: 60,
  scale: 1,
  color: '#0000FF',
  borderRadius: 6,
  $focus: {
    alpha: 1,
    scale: 1.05,
  },
  transition: { scale: true },
};

const ActionKeyIconStyle: lng.NodeStyles = {
  y: 6,
  x: 48,
  width: 48,
  height: 48,
  color: '#c6c6c6',
};

const keyContainerStyle: lng.NodeStyles = {
  height: 60,
  color: '#000000',
  scale: 1,
  borderRadius: 6,
  $focus: {
    scale: 1.05,
    color: '#0000FF',
  },
};

const BaseKeyTextStyle: lng.TextStyles = {
  fontSize: 42,
  lineHeight: 60,
};

const KeyText: lng.TextStyles = {
  ...BaseKeyTextStyle,
  width: 48,
  contain: 'both',
  textAlign: 'center',
};

export function onKeyPressWhenKeyboardOpen(setKeyEvent: s.Setter<string>, event: KeyboardEvent) {
  if (event.key.length === 1)
    setKeyEvent(event.key);
  else if (event.key === 'Backspace')
    setKeyEvent('delete');
  if (event.key.length === 1 && (/[a-zA-Z0-9._@-]/).test(event.key) || event.key === 'Backspace')
    return true;
  return false;
};

export interface KeyProps extends lng.NodeProps {
  key?: string;
  title?: string;
  textColor?: string;
}

export const Key: s.Component<KeyProps> = props => (
  <view width={48} {...props} style={keyContainerStyle}>
    <text style={KeyText}>{props.key || props.title}</text>
  </view>
);

export interface ActionKeyProps extends lng.NodeProps {
  key: string
}

export const ActionKey: s.Component<ActionKeyProps> = props => (
  <lng.Switch>
    <lng.Match when={typeof props.key === 'string'}>
      <view
        {...props}
        key={props.key}
        display='flex'
        padding={20}
        style={keyContainerStyle}
      >
        <text style={BaseKeyTextStyle}>{props.key}</text>
      </view>
    </lng.Match>
    <lng.Match when={props.key.icon}>
      <view {...props} key={props.key.key} style={actionKeyContainerStyle}>
        <view src={`${props.key.icon}`} style={ActionKeyIconStyle} />
      </view>
    </lng.Match>
    <lng.Match when={true}>
      <view
        {...props}
        key={props.key.key}
        display='flex'
        padding={20}
        style={/* @once */ props.key?.size ? actionKeyContainerStyle : keyContainerStyle}
      >
        <text style={BaseKeyTextStyle}>{props.key.title}</text>
      </view>
    </lng.Match>
  </lng.Switch>
);

export const Keyboard: s.Component<lng.NodeProps & { formats: any, onEnter: any }> = props => {
  const [layout, setLayout] = s.createSignal('default');
  const config = s.createMemo(() => (props.formats[layout()]));
  const onEnter = (_e, _keyboard, key) => {
    if (typeof key.key === "string") {
      return false;
    }

    if (key.key.title === 'shift') {
      setLayout(p => p === 'uppercase' ? 'default' : 'uppercase');
      return true;
    }

    if (key.key.title === 'symbol') {
      setLayout(p => p === 'symbol' ? 'default' : 'symbol');
      return true;
    }

    return false;
  };

  const handleEnter = lngp.chainFunctions(onEnter, props.onEnter);

  return <lngp.Column transition={false} {...props} gap={12} scroll='none' onEnter={handleEnter}>
    <lng.For each={config()}>
      {keyRow => (
        <view display='flex' justifyContent='center' gap={6}
          forwardFocus={lngp.spatialForwardFocus}
          onLeft={lngp.navigableHandleNavigation}
          onRight={lngp.navigableHandleNavigation}
        >
          <lng.For each={keyRow}>
            {key =>
              <s.Show when={typeof key === 'string' && (key as string).length === 1}
                fallback={<ActionKey key={key} />}>
                <Key key={key as string} />
              </s.Show>
            }
          </lng.For>
        </view>
      )}
    </lng.For>
  </lngp.Column>
  ;
};

export interface FullScreenKeyboardProps extends lng.NodeProps {
  type?: 'default' | 'uppercase' | 'symbol';
  valueSignal: s.Signal<string>;
  placeholder?: string;
  formats?: any;
}

export const FullScreenKeyboard: s.Component<FullScreenKeyboardProps> = props => {
  const keyEvents = s.createSignal('');
  const [_keyEvent, setKeyEvent] = keyEvents;

  const onEnter = (_e, _keyboard, key) => {
    if (key.key === 'save' || key.key === 'Save')
      return false;

    if (key.key)
      setKeyEvent(key.key as string);

    return true;
  };

  return (
    <view
      {...props}
      width={1920}
      height={1080}
      color={'#000000'}
      zIndex={10}
      forwardFocus={1}
      onKeyPress={(keyBoardEvent) => onKeyPressWhenKeyboardOpen(setKeyEvent, keyBoardEvent)}
    >
      <Input
        y={180}
        width={950}
        centerX
        valueSignal={props.valueSignal}
        placeholder={'Search for something'}
        keyEvents={keyEvents}
        mask='•'
      />

      <lngp.Column y={270}>
        <Keyboard onEnter={onEnter} formats={props.formats} />
      </lngp.Column>

    </view>
  );
};
