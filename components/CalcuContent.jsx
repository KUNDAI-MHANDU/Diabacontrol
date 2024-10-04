import { View, Text } from 'react-native'
import LottieView from 'lottie-react-native';

const CalcuContent = () => {
  return (
    <View style={{
        padding: 20
    }}>
        <View style={{height: 240, width: "100%"}}>
            <LottieView source={require("../assets/Animation - 1727829149731.json")}
            style={{width: "100%", height: "100%"}}
            autoPlay
            loop
            />
        </View>
      <Text style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: '#333',
            textAlign: 'center',
            marginVertical: 20,
      }}>What is an Insulin Calculator?</Text>
      <Text>An insulin calculator is a tool designed to help people with diabetes determine the appropriate amount of insulin they should take based on various factors. It calculates the insulin dose by considering the individual’s carbohydrate intake, current blood sugar level, target blood sugar level, insulin-to-carb ratio (ICR), and insulin sensitivity factor (ISF).</Text>
      <Text style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: '#333',
            textAlign: 'center',
            marginVertical: 20,
      }}>How Does an Insulin Calculator Work?</Text>
      <Text>The insulin calculator works by taking two main components into account:

Correction Dose: This adjusts for how much the blood sugar is above or below the target level. The difference between the current blood sugar and the target level is divided by the insulin sensitivity factor (ISF), which indicates how much 1 unit of insulin lowers the blood sugar.

Formula:
Correction Dose = (Current Blood Sugar - Target Blood Sugar) / ISF

Carbohydrate Dose: This calculates the amount of insulin required to cover the carbs the individual plans to consume. The carbohydrate intake is divided by the insulin-to-carb ratio (ICR), which indicates how many grams of carbohydrates are covered by 1 unit of insulin.

Formula:
Carb Dose = Carbohydrate Intake / ICR

The calculator adds these two doses together to determine the total insulin dose. If the result is positive, it suggests the insulin units needed; otherwise, the dose is set to zero.</Text>
    </View>
  )
}

export default CalcuContent