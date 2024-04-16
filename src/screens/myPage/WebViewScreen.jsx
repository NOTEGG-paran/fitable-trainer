import React from 'react';
import { WebView } from 'react-native-webview';
import { View } from 'react-native';

function WebViewScreen({ route }) {
  let uri = route.params.uri;

  if (!uri.startsWith('http://') && !uri.startsWith('https://')) {
    uri = 'http://' + uri;
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri }} />
    </View>
  );
}

export default WebViewScreen;
