import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import styles from './styles';

const ComponenteGraf = ({ chartData }) => {
  return (
    <View>
      {chartData.map((data, index) => (
        <View key={index}>
          <Text style={ styles.text2}>{data.title}</Text>
          <LineChart
            data={data.chartData}
            width={300}
            height={220}
            yAxisSuffix=".g"
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: "#4E52A9",
              backgroundGradientFrom: "#4D6B7A",
              backgroundGradientTo: "#4D6B7A",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 12
              },
              propsForDots: {
                r: "4",
                strokeWidth: "1",
                stroke: "#394A53"
              }
            }}
            bezier
            style={{
              borderRadius: 10,
              marginBottom:40
            }}
          />
        </View>
      ))}
    </View>
  );
};

export default ComponenteGraf;
