import styled from 'styled-components';
// @ts-ignore
import colors from 'tailwindcss/colors';
import menu from 'src/assets/images/patterns/menu.svg';

const MenuItem = styled.div`
  font-weight: 500;
  font-size: 0.9rem;

  a,
  button {
    color: ${colors.gray['400']};

    &.active {
      overflow: visible;
      color: #57687a;
      font-weight: bold;
      background-color: transparent !important;

      ~ ul {
        li {
          a.active {
            > div {
              background: #57687a;
            }

          }
        }
      }

      > div {
        background: #57687a;
      }

      &:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        left: auto;
        height: 3rem;
        width: 1rem;
        background-image: url('${menu}');
        background-repeat: no-repeat;
        background-size: auto;
        background-position: center;
        z-index: 1000;
      }
    }
  }
`;

export default MenuItem;
