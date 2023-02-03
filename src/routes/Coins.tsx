import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinsList = styled.div``;
const Coin = styled.div`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  font-size: 25px;
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 20px;
  a {
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await (
        await fetch("https://api.coinpaprika.com/v1/coins")
      ).json();
      setCoins(response.slice(0, 100));
      // setLoading(false);
    })();
  }, []);
  console.log(coins);
  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {coins.map((coin) => (
            <Link to={`/${coin.id}`}>
              <Coin key={coin.id}>{coin.name} &rarr;</Coin>
            </Link>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
