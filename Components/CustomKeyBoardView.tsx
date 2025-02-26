import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const ios = Platform.OS == 'ios';
const CustomKeyBoardView = ({children}: {children: React.JSX.Element}) => {
  const [keyboardStatus, setKeyboardStatus] = useState(1);
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(1);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(0);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={ios ? 'padding' : 'height'}
      contentContainerStyle={{flex: 1}}
      enabled
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? 88 : keyboardStatus === 1 ? 40 : 0
      }
      style={{flex: 1, height: '100%'}}>
      <ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flex: 1}}
        showsVerticalScrollIndicator={false}
        style={{flexGrow: 1}}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomKeyBoardView;
