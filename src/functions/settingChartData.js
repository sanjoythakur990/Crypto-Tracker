import { convertDate } from "./convertDate";

export const settingChartData = (setChartData, prices1, prices2) =>{
  if(prices2){
    setChartData({
      labels: prices1.map((item) => convertDate(item[0])),
      datasets: [
        {
          label: "Crypto 1",
          data: prices1.map((item) => item[1]),
          borderColor: "#3a80e9",
          fill: false,
          // backgroundColor: "transparent",
          tension: 0.15,
          pointRadius: 0,
          yAxisID: "crypto1",
        },
        {
          label: "Crypto 2",
          data: prices2.map((item) => item[1]),
          borderColor: "#61c96f",
          fill: false,
          // backgroundColor: "transparent",
          tension: 0.15,
          pointRadius: 0,
          yAxisID: "crypto2",
        }
      ],
    });
  }
  else{
    setChartData({
      labels: prices1.map((item) => convertDate(item[0])),
      datasets: [
        {
          data: prices1.map((item) => item[1]),
          borderColor: "#3a80e9",
          backgroundColor: "transparent",
          tension: 0.15,
          pointRadius: 0,
          yAxisID: "crypto1",
        },
      ],
    });
  }
    
}