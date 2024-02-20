import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseX = await axios.get('https://retoolapi.dev/gDa8uC/data');
      const responseY = await axios.get('https://retoolapi.dev/o5zMs5/data');

      const slicedData = responseX.data.slice(0, 50).map((value, index) => ({
        id: value.id,
        label: value.Label,
        x: value.RandomNumber, // Assuming RandomNumber is the x-axis value
        y: responseY.data[index].RandomNumber, // Assuming RandomNumber is the y-axis value
      }));

      setData(slicedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="x" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="y" stroke="#8884d8" />
          <Line type="monotone" dataKey="x" stroke="red" />
        
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;