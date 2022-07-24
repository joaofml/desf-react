import { useEffect, useState } from "react";
import styled from "styled-components";

const ListContainer = styled.table`
  background-color: #F8F8FF;
  padding: 30px;
`

const TimeContainer = styled.tr`
  background-color: #F0FFFF;
  padding: 300px;
`

const StyledTd = styled.td`
  padding: 6px;
`

function App() {
  
  let [year, setYear] = useState(2003);
  let [data, setData] = useState([]);
  const years = [];
  for(let i = 2003; i<=2015;i++) years.push(i);
  useEffect(
    () => {
      fetch("http://localhost:3001/"+year).then(res => res.json())
      .then(values=>{
        let partidas = values[values.length-1].partidas;
        console.log(values);
        // console.log(partidas);
        let lista = [];
        for(let i of partidas){
          lista.push({nome : i.mandante, info: i.pontuacao_geral_mandante});
          lista.push({nome : i.visitante, info: i.pontuacao_geral_visitante});
        }
        lista.sort((a,b)=>{return a.info.total_pontos > b.info.total_pontos ? -1: 1})
        setData(lista);});
    },[year]);
  // console.log(data);
  return (
    <div>
      <label for="Ano">Selecione o Ano</label>
      <select value={year} onChange={(e)=>setYear(e.target.value)}>
        {years.map((v,)=>(
          <option key={v} value={v}>{v}</option>
        ))}
      </select>
      <ListContainer>
        <tr>
          <th>
            <strong>Posição</strong>
          </th>
          <th>
            <strong>Time</strong>
          </th>
          <th>
            <strong>P</strong>
          </th>
          <th>
            <strong>J</strong>
          </th>
          <th>
            <strong>V</strong>
          </th>
          <th>
            <strong>E</strong>
          </th>
          <th>
            <strong>D</strong>
          </th>
          <th>
            <strong>GP</strong>
          </th>
          <th>
            <strong>GC</strong>
          </th>
          <th>
            <strong>SG</strong>
          </th>
        </tr>
        {data.map((item,index) => (
          <TimeContainer key={item.nome}>
              <StyledTd>
                {index+1}
              </StyledTd>
              <StyledTd>
                {item.nome}
              </StyledTd>
              <StyledTd>
                {item.info.total_pontos}
              </StyledTd>
              <StyledTd>
                {item.info.jogos_casa + item.info.jogos_fora_casa}
              </StyledTd>
              <StyledTd>
                {item.info.total_vitorias}
              </StyledTd>
              <StyledTd>
                {item.info.total_empates}
              </StyledTd>
              <StyledTd>
                {item.info.total_derrotas}
              </StyledTd>
              <StyledTd>
                {item.info.total_gols_marcados}
              </StyledTd>
              <StyledTd>
                {item.info.total_gols_sofridos}
              </StyledTd>
              <StyledTd>
                {item.info.total_gols_marcados - item.info.total_gols_sofridos}
              </StyledTd>
          </TimeContainer>
        ))}       
      </ListContainer>
    </div>
  );
}

export default App;
