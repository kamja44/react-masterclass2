import { useParams } from "react-router-dom";
interface Params {
  coinId: string;
}
function Coin() {
  const { coinId } = useParams<Params>();
  return <h1>{coinId}</h1>;
}
export default Coin;