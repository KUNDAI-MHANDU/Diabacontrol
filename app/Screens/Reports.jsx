import { ScrollView, StyleSheet, Text} from 'react-native';
import CarbsReport from '../../components/CarbsReport';
import InsulinReport from '../../components/InsulinReport';
import GlucoseReport from '../../components/GlucoseReport';
import ReportContent from '../../components/ReportContent';


export default function ReportScreen() {

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Reports</Text>
        <ReportContent/>
        <CarbsReport/>
        <InsulinReport/>
        <GlucoseReport/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});
