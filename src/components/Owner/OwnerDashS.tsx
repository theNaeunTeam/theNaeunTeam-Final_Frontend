import OwnerNavbar from "./OwnerNavbar";
import styled from "styled-components";

const DivContainer = styled.div`
  border: solid black;
  display: inline-flex;
  justify-content: center;
  margin: 50px;
  padding: 10px;
  width: 100%;

`;

const DivNav = styled.div`
  width: 20%;
  font-size: large;

`;
const DivMain = styled.div`
  width: 70%;
  height: 100%;
`;
export default function OwnerDashS() {
    return (
        <DivContainer>
            <DivNav>
                <OwnerNavbar/>
            </DivNav>
            <DivMain>
                <h3>기타</h3>
            </DivMain>
        </DivContainer>
    )
}