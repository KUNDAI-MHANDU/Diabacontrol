import { View, Text } from 'react-native'
import LottieView from 'lottie-react-native';

const RecordContent = () => {
  return (
    <View style={{padding: 20}}>
        <View style={{height: 240, width: "100%",}}>
            <LottieView source={require("../assets/Animation - 1727831587069.json")}
            style={{width: "100%", height: "100%"}}
            autoPlay
            loop
            />
        </View>
        <Text>The record data feature allows users to input and store essential health data such as carbohydrate count, insulin dose, and blood glucose levels. This data is saved locally on the device for future reference. Here’s how it works:</Text>
    </View>
  )
}

export default RecordContent