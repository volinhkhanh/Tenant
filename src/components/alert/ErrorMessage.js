
import {Alert} from "react-native"
export const ErrorProcess = {
    alert(title = 'Alert', message = '') {
        Alert.alert(
            title,
            message,
            [
                { text: 'OK' }
            ],
            { cancelable: false }
        );
    },
    alertOTP(title = 'Alert', message = '',onClose) {
        Alert.alert(
            title,
            message,
            [
                { text: 'CLOSE',onPress:onClose }
            ],
            { cancelable: false }
        );
    }
}