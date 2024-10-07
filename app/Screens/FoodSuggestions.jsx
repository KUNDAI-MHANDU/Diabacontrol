import { View, Text, FlatList, Image, StyleSheet, ScrollView} from 'react-native';
import React from 'react'

const img = require('../../assets/giphy.gif')

const FoodSuggestions = () => {
  return (
    <ScrollView style={{flex: 1, padding: 5}}>
        <Image 
            source={img}
            style={{height: 250, width: "100%", marginBottom: 20}}
        />
        <Text style={{
            fontSize: 24,
            marginBottom: 20,
            textAlign: 'center',
            fontWeight: 'bold'
        }}>Welcome To Food Suggestions</Text>
        <Text style={{marginBottom: 10}}>Managing diabetes starts with making the right food choices. Here, you’ll find a variety of food recommendations and tips to help you maintain balanced blood sugar levels. Explore delicious, diabetes-friendly meals, snacks, and simple recipes that support a healthy lifestyle. Whether you’re at home or eating out, these suggestions will guide you toward better nutrition and better health.</Text>
        <View style={styles.separator} />
        <Text style={{
            fontSize: 24,
            marginBottom: 20,
            textAlign: 'center',
            fontWeight: 'bold'
        }}>Low Glycemic Index (GI) Foods</Text>
        <Text style={{marginBottom: 10}}>Low-GI foods are absorbed more slowly by the body, causing a gradual rise in blood sugar levels instead of a spike. This helps keep blood sugar stable and can improve long-term blood sugar control. Eating these foods can help reduce insulin resistance and prevent complications related to diabetes.

Examples of Low-GI Foods:
Whole grains: Brown rice, quinoa, whole wheat pasta
Non-starchy vegetables: Spinach, broccoli, bell peppers
Legumes: Lentils, chickpeas, black beans
Fruits: Apples, berries, oranges (in moderation)
Including more low-GI foods in your meals can provide steady energy throughout the day, helping you manage blood sugar more effectively.

</Text>
<View style={styles.separator} />
<Text style={{
            fontSize: 24,
            marginBottom: 20,
            textAlign: 'center',
            fontWeight: 'bold'
        }}>Fiber-Rich Foods</Text>
        <Text>Fiber is essential for people with diabetes as it helps slow down the digestion of carbohydrates, reducing blood sugar spikes after meals. High-fiber foods also improve insulin sensitivity, which can help control blood sugar levels more effectively.

Examples of Fiber-Rich Foods:
Fruits: Apples, pears, berries
Vegetables: Carrots, leafy greens, Brussels sprouts
Whole grains: Oats, barley, quinoa
Beans and legumes: Kidney beans, lentils, black beans
Aim for both soluble fiber (found in oats, beans, and fruits) and insoluble fiber (found in whole grains and vegetables) to improve overall gut health and blood sugar control.</Text>
<View style={styles.separator} />
<Text style={{
            fontSize: 24,
            marginBottom: 20,
            textAlign: 'center',
            fontWeight: 'bold'
        }}>Healthy Fats</Text>
        <Text style={{marginBottom: 10}}>Incorporating healthy fats into your diet helps reduce inflammation, supports heart health, and improves blood sugar levels by slowing digestion and absorption. Healthy fats also help keep you full for longer, preventing overeating and blood sugar spikes.

Good Sources of Healthy Fats:
Avocados
Olive oil, flaxseed oil
Nuts: Almonds, walnuts, cashews
Seeds: Chia seeds, flaxseeds, sunflower seeds
Fatty fish: Salmon, mackerel, sardines
Be mindful of portion sizes, as fats are calorie-dense, but including these in your meals can support better blood sugar management.

</Text>
<View style={styles.separator} />
<Text style={{
            fontSize: 24,
            marginBottom: 20,
            textAlign: 'center',
            fontWeight: 'bold'
        }}>Protein Options</Text>
        <Text style={{marginBottom: 10}}>Protein plays a key role in stabilizing blood sugar by slowing down the absorption of carbohydrates. Choosing lean sources of protein helps you manage hunger and avoid blood sugar spikes while also supporting muscle health and overall well-being.

Examples of Lean Protein Options:
Poultry: Skinless chicken, turkey
Fish: Salmon, tuna, cod (also great sources of omega-3 fatty acids)
Plant-based proteins: Tofu, tempeh, lentils, beans
Eggs
Low-fat dairy: Greek yogurt, cottage cheese
Incorporating these proteins into your meals helps balance your plate and provides sustained energy without increasing blood sugar levels too quickly.</Text>


    </ScrollView >
  )
};

const styles = StyleSheet.create({
    separator: {
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      marginVertical: 10,
    },
  });

export default FoodSuggestions