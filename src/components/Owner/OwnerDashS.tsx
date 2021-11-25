import OwnerNavbar from "./OwnerNavbar";
import styled from "styled-components";
import {useLayoutEffect} from "react";
import {useHistory} from "react-router-dom";

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
    const history = useHistory();
    useLayoutEffect(() => {
        if (!localStorage.getItem('ownerToken')) history.push('/err');
    }, []);

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
