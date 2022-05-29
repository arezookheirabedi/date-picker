import {forwardRef} from 'react';
import styled from 'styled-components';

export const ListInfinity = forwardRef((props: any, ref: any) => (
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  <ListInfinityStyle {...props} ref={ref}>
    {props.children}
  </ListInfinityStyle>
));

const ListInfinityStyle = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }
`;
