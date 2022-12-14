import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { useLocation } from "react-router-dom";
import ApexChart from "react-apexcharts";
interface CharProps {
  coinId: string;
}
interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
interface IParams {
  params: string;
}
function Chart({ coinId }: CharProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId)
    // 5.15
    // {
    //   refetchInterval: 10000,
    // }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={
            [
              {
                name: "price",
                data: data?.map((value) => {
                  return {
                    x: new Date(value.time_open * 1000)
                      .toISOString()
                      .substring(0, 10),
                    y: [value.open, value.high, value.low, value.close],
                  };
                }),
              },
            ] as any
          }
          options={{
            chart: {
              type: "candlestick",
            },
            title: {
              text: "Coin Chart",
              align: "center",
            },
            tooltip: {
              enabled: false,
            },
            xaxis: {
              type: "datetime",
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
