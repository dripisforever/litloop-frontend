import styled from "styled-components";

export const StyledListItem = styled.li`
   /* display: ${props => props.flex && 'flex'} */

   display: flex;

  ${props => props.hover && `
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    cursor: pointer;
  `}
`;
