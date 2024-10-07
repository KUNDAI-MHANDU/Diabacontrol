import { View, Text, FlatList, Image, StyleSheet, ScrollView} from 'react-native';
import React from 'react'

const img = require('../../assets/Lifestyle.jpg')

const LifeStyle = () => {
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
        }}>Welcome To Life Style</Text>
        <Text style={{marginBottom: 10}}>Living well with diabetes goes beyond managing blood sugar—it’s about creating healthy habits that support your overall well-being. In this section, you’ll discover practical tips on exercise, stress management, sleep, and more. These lifestyle changes can improve your health, boost energy levels, and help you maintain better control over your diabetes.</Text>
        <View style={styles.separator} />
        <Text style={{
            fontSize: 24,
            marginBottom: 20,
            textAlign: 'center',
            fontWeight: 'bold'
        }}>Daily Routine Tips</Text>
        <Text style={{marginBottom: 10}}>Creating a daily routine is key to managing diabetes effectively. A consistent routine helps regulate blood sugar, reduces stress, and improves overall health. Here are a few tips to get started:

Balanced Meals: Plan your meals around a balanced mix of carbohydrates, proteins, and healthy fats. Try to eat at the same times each day to avoid blood sugar spikes. Focus on portion control and include low-GI foods and fiber-rich options to keep your blood sugar stable throughout the day.

Regular Exercise: Aim for at least 30 minutes of physical activity each day. Whether it’s walking, biking, or yoga, staying active helps your body use insulin more effectively and lowers blood sugar levels. Build exercise into your routine, even if it’s something as simple as a short walk after meals.

Medication Management: Take your medications or insulin at the same time each day. Use reminders or alarms to ensure you don’t miss a dose. Pair your medication routine with daily activities like brushing your teeth or having breakfast to create a habit.

Consistency in your daily routine is key to staying on top of your diabetes care and feeling your best.</Text>
<View style={styles.separator} />
<Text style={{
            fontSize: 24,
            marginBottom: 20,
            textAlign: 'center',
            fontWeight: 'bold'
        }}>Setting Realistic Goals</Text>
        <Text style={{marginBottom: 10}}>Setting realistic and achievable health goals can make managing diabetes feel less overwhelming. Here’s how to create goals you can stick to:

Start Small: Set small, manageable goals to avoid feeling discouraged. Instead of aiming for a major lifestyle change, focus on small steps like adding a serving of vegetables to each meal or going for a 10-minute walk after dinner.

Be Specific: Make your goals clear and actionable. For example, instead of saying “I’ll exercise more,” set a goal like “I will walk for 20 minutes after lunch three days a week.”

Track Progress: Break your goals into smaller milestones and celebrate your progress. Each small success motivates you to keep going. If you want to lose weight, for example, track each pound lost or increase in physical activity.

Adjust as Needed: Life can get busy, and it’s okay to adjust your goals. Be flexible and remember that progress is more important than perfection. If you hit a setback, reassess and make adjustments that fit your current lifestyle.

By setting realistic goals, you’ll build confidence, improve your health, and stay motivated on your diabetes journey.</Text>
<View style={styles.separator} />
<Text style={{
            fontSize: 24,
            marginBottom: 20,
            textAlign: 'center',
            fontWeight: 'bold'
        }}>Tracking Progress</Text>
        <Text style={{marginBottom: 10}}>Tracking your health progress helps you stay accountable and gives you a clear picture of what works best for your body. Here are ways to effectively track your diabetes management:

Blood Sugar Monitoring: Keep a log of your blood sugar readings, noting the time of day and any patterns you observe. Many apps make this easy by allowing you to record your levels, get reminders, and even share your data with healthcare providers.

Activity Tracking: Use an app, fitness tracker, or journal to record your daily activity levels. Tracking steps, exercise sessions, or even how long you stand each day helps you stay motivated and monitor your progress over time.

Food and Meal Tracking: Journaling your meals can help identify which foods impact your blood sugar the most. Record what you eat, portion sizes, and how your blood sugar responds afterward.

Health Journals: Consider using a physical or digital journal to record your progress, mood, energy levels, and any symptoms. This can help you spot patterns and make informed decisions about your diet, exercise, or medication adjustments.

Tracking your progress not only keeps you motivated but also provides valuable information for you and your healthcare team to fine-tune your diabetes management plan.

</Text>

    </ScrollView>
  )
};

const styles = StyleSheet.create({
    separator: {
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      marginVertical: 10,
    },
  });

export default LifeStyle