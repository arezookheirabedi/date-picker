import styled from 'styled-components';



const SubMenuItem = styled.li`
  & > .active {
    color: #75a29e;
    font-weight: bold;
    background-color: transparent !important;

    & > div > div{
      background-color: #75a29e;
    }
  }
`;

export default SubMenuItem;
