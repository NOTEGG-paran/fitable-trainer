/**
 * 1. **프로젝트명**: 핏에이블 강사앱
 * 2. **파일명**: WebViewScreen.js
 * 3. **설명**:
 *    - WebView를 사용해 외부 URL을 로드하는 화면.
 *    - route를 통해 전달받은 `uri`를 WebView로 렌더링.
 */

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
