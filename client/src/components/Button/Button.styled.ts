import styled, { css } from 'styled-components';
import { Button } from 'react-bootstrap';

/**
 * These are just placeholders for now but the idea is to generate a bunch of
 * styles based on the color or size props and others we pass in to match our
 * figma designs for our custom styled buttons
 *
 * Example: Each button color will come with a set of different bgColor,
 * hoverColor, activeColor,textDisabledColor, borderColor etc.
 *
 * We pass the button this color prop and then a function can generate and set
 * all of these values in the css below.
 * */

export type ButtonColor = 'blue' | 'red' | 'green' | 'yellow';
export type ButtonSize = 'small' | 'medium' | 'large';

// Consider html tag <button> vs React Bootsrap <Button> to build off of..
// Trade offs of total customization vs already built in styles
export const Root = styled(Button)<{ $fullWidth: boolean }>(
  ({ $fullWidth }) => {
    return css`
      white-space: nowrap;
      width: ${$fullWidth ? '100%' : 'auto'};
    `;
  },
);
