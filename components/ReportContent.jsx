import { View, Text } from 'react-native'
import LottieView from 'lottie-react-native';

const ReportContent = () => {
  return (
    <View style={{padding: 20}}>
        <View style={{height: 240, width: "100%",}}>
            <LottieView source={require("../assets/Animation - 1727845961761.json")}
            style={{width: "100%", height: "100%"}}
            autoPlay
            loop
            />
        </View>
        <Text>This report screen provides a visual overview of your carbohydrate intake, insulin doses, and blood glucose levels. It retrieves data you've saved previously and presents it in easy-to-read charts. The screen allows you to switch between the reports and generate AI-driven summaries for each, helping you understand trends in your health data over time.</Text>
    </View>
  )
}

export default ReportContent