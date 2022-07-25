import { useEffect, useState } from "react";
import styled from "styled-components";

const ListContainer = styled.table`
  background-color: #98FB98;
  padding: 30px;
`
const StyledImg = styled.img`
  vertical-align: -5opx
`
const TimeContainer = styled.tr`
  background-color: #FFFFFF;
`

const StyledTd = styled.td`
  padding: 0px 10px 0px 10px;
  vertical-align: -50%;
`
//function to treat the name input and find the image file
function getImage(nome){
  let filename = nome.normalize('NFC').toLowerCase().split(" ").join("_")
  .replace(/[áàãâ]/g,"a")
  .replace(/[éèêẽ]/g,"e")
  .replace(/[íìîĩ]/g,"i")
  .replace(/[óòõô]/g,"o")
  .replace(/[úùûũ]/g,"u")
  return require(`./images/${filename}.png`);
}

function App() {
  //hooks for year input, and data from api
  let [year, setYear] = useState(2003);
  let [data, setData] = useState([]);

  //creating a array with the available years for the dropdown list
  const years = [];
  for(let i = 2003; i<=2015;i++) years.push(i);

  useEffect(
    () => {
      fetch("http://localhost:3001/"+year).then(res => res.json())
      .then(values=>{
        let partidas = values[values.length-1].partidas;
        let lista = [];
        console.log(values)
        for(let i of partidas){
          lista.push({nome : i.mandante, info: i.pontuacao_geral_mandante});
          lista.push({nome : i.visitante, info: i.pontuacao_geral_visitante});
        }
        lista.sort((a,b)=>{
          return a.info.total_pontos > b.info.total_pontos ? -1 : a.info.total_pontos < b.info.total_pontos ? 1 :
                 a.info.total_vitorias > b.info.total_vitorias ? -1 : a.info.total_vitorias < b.info.total_vitorias ? 1 :
                 (a.info.total_gols_marcados - a.info.total_gols_sofridos) > (b.info.total_gols_marcados - b.info.total_gols_sofridos) ? -1 : (a.info.total_gols_marcados - a.info.total_gols_sofridos) < (b.info.total_gols_marcados - b.info.total_gols_sofridos) ? 1 :
                 a.info.total_gols_marcados > b.info.total_gos_marcados ? -1 : 1})
        setData(lista);});
    },[year]);

  return (
    <div>
      <label>Selecione o Ano</label>
      <select value={year} onChange={(e)=>setYear(e.target.value)}>
        {years.map((v,)=>(
          <option key={v} value={v}>{v}</option>
        ))}
      </select>
      <ListContainer>
        <thead>
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
        </thead>
        <tbody>
          {data.map((item,index) => (
            <TimeContainer key={item.nome}>
                <StyledTd>
                  {index+1}
                </StyledTd>
                <StyledTd>
                    <div>
                      <StyledImg src={(getImage(item.nome))} alt="" />
                      <span>
                        {item.nome}                 
                      </span>
                    </div>
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
        </tbody>
      </ListContainer>
    </div>
  );
}

export default App;
