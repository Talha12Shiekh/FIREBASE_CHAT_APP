import {Animated, ImageSourcePropType, Keyboard} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ImagePicker from './ImagePicker';
import {styles} from '../styles';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

type ImagePickerContainerTypes = {
  isKeyboardVisible: boolean;
  setisKeyboardVisible: React.Dispatch<React.SetStateAction<boolean>>;
  topimage: ImageSourcePropType | undefined | string;
};

export type Userimage = {
  uri: string;
};

const ImagePickerContainer = ({
  isKeyboardVisible,
  setisKeyboardVisible,
  topimage,
}: ImagePickerContainerTypes) => {
  const imagePickerTranslateY = useRef(new Animated.Value(0)).current;
  const imagePickerOpacity = useRef(new Animated.Value(1)).current;
  const [userimage, setuserimage] = useState<Userimage | null>(null);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setisKeyboardVisible(true);
      Animated.parallel([
        Animated.timing(imagePickerTranslateY, {
          toValue: -wp(40), // Move the ImagePicker up off-screen
          duration: 300,
          useNativeDriver: true, // Smooth animations
        }),
        Animated.timing(imagePickerOpacity, {
          toValue: 0, // Fade out
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });

    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setisKeyboardVisible(false);
      Animated.parallel([
        Animated.timing(imagePickerTranslateY, {
          toValue: 0, // Bring the ImagePicker back to its original position
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(imagePickerOpacity, {
          toValue: 1, // Fade in
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, [imagePickerTranslateY, imagePickerOpacity]);

  return (
    <Animated.View
      style={[
        {
          transform: [{translateY: imagePickerTranslateY}],
          opacity: imagePickerOpacity,
        },
      ]}>
      {!isKeyboardVisible && (
        <ImagePicker
          setuserimage={setuserimage}
          userimage={userimage}
          topimage={topimage}
        />
      )}
    </Animated.View>
  );
};

export default ImagePickerContainer;
