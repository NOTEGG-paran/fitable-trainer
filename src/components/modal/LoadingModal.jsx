import { Modal, View, ActivityIndicator, StyleSheet,Text } from 'react-native';
import { COLORS } from '../../constants/color';

function LoadingModal({ isLoading }) {
  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={isLoading}
      onRequestClose={() => {}}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ActivityIndicator size="large" color={COLORS.main} />
          <Text style={styles.modalText}>회원목록을 불러오고 있습니다.</Text>
        </View>
      </View>
    </Modal>
  );
}

export default LoadingModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalView: {
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
  modalText :{
    color: COLORS.main,
    fontSize:14,
    marginTop:10,
  }
});
