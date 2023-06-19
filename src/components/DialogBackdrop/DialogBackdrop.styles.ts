import styled, { CSSObject } from '@emotion/styled';

import { DialogProps } from '@types';

export const StyledDialogBackdrop = styled.div<
  Pick<DialogProps, 'fullScreen' | 'transitionDuration'> & {
    dialogOpen: boolean;
    dialogClose: boolean;
  }
>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  ${({ fullScreen }): CSSObject =>
    !fullScreen
      ? {
          padding: '20px 32px'
        }
      : {}};

  background-color: ${({
    theme: {
      palette: { common }
    }
  }) => common.overlay60};
  overflow: hidden;
  z-index: ${({ theme: { zIndex } }) => zIndex.dialog};
  opacity: 0;
  visibility: hidden;
  transition: opacity ${({ transitionDuration }) => transitionDuration}ms cubic-bezier(0, 0, 0.2, 1);

  ${({ dialogOpen }): CSSObject =>
    dialogOpen
      ? {
          opacity: 1,
          visibility: 'visible'
        }
      : {}};
  ${({ dialogClose }): CSSObject =>
    dialogClose
      ? {
          opacity: 0
        }
      : {}};
`;
