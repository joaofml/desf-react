import { useEffect, useState } from "react";
import styled from "styled-components";

const ListContainer = styled.table`
  background-color: #F8F8FF;
`

const TimeContainer = styled.tr`
  background-color: #F0FFFF;
`

function App() {
  
  let [year, setYear] = useState(2003);
  let [data, setData] = useState([]);

  useEffect(
    () => {
      fetch("http://localhost:3001/"+year).then(res => res.json())
      .then(values=>{
        let partidas = values[values.length-1].partidas;
        console.log(partidas)
        let lista = [];
        for(let i of partidas){
          lista.push({nome : i.mandante, dados: i.pontuacao_geral_mandante});
          lista.push({nome : i.visitante, dados: i.pontuacao_geral_visitante});
        }
        lista.sort((a,b)=>{return a.dados.total_pontos > b.dados.total_pontos ? -1: 1})
        setData(lista);});
    },[year]);
  console.log(year);
  console.log(data);
  return (
    <ListContainer>
      {data.map((item) => (
        <TimeContainer>
            <td>
              {item.nome}
            </td>
            <td>
              {item.dados.total_pontos}
            </td>
        </TimeContainer>
      ))}       
    </ListContainer>
  );
}

export default App;
