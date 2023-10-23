import { View } from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";

const AttendanceChat = ({data}) => {

  return (
    
    <View>
      <BarChart
        barWidth={22}
        noOfSections={3}
        barBorderRadius={4}
        frontColor="lightgray"
        data={data}
        allo
        yAxisThickness={0}
        xAxisThickness={0}
      />
    </View>
  );
};

export default AttendanceChat;
