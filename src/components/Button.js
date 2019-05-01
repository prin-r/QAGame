import styled from 'styled-components'
import { Button } from 'rebass'
import colors from '../ui/colors'

export default styled(Button)`
  background-color: ${colors.oliveGreen};
  box-shadow: 0 2px 4px 0 ${colors.oliveBrown};
  transition: 0.2s all;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: ${colors.oliveBrown};
  }

  &:active {
    background-color: ${colors.oliveBrown};
    box-shadow: 0 0px 0px 0 ${colors.oliveBrown};
    transform: scale(0.95);
  }
`
