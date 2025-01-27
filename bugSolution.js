// bugSolution.js
import { Camera, CameraType } from 'expo-camera';
import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const resetCamera = () => {
    if (cameraRef.current) {
      // Force a preview refresh using the timeout
      setTimeout(() => {
        cameraRef.current.takePictureAsync({ base64: true });
      }, 500);
    }
  };

  if (hasPermission === null) {
    return <View />;  // Or a loading indicator
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef} flashMode={Camera.Constants.FlashMode.on}>
      </Camera>
      <Button title="Reset Camera Preview" onPress={resetCamera} />
    </View>
  );
};
export default App;