import styled, { CSSObject } from '@emotion/styled';

import type { DialogProps } from '@types';

export const Wrapper = styled.div<
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
          padding: 20
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

export const StyledDialog = styled.div<
  Pick<DialogProps, 'fullScreen' | 'transitionDuration' | 'disablePadding'> & {
    dialogOpen: boolean;
    dialogClose: boolean;
  }
>`
  width: calc(100% - 64px);
  padding: 32px 20px 20px;
  text-align: center;

  ${({ disablePadding }): CSSObject => (disablePadding ? { padding: 0 } : {})}

  background-color: ${({ theme: { palette } }) => palette.common.bg01};
  box-shadow: ${({
    theme: {
      box: { shadow }
    }
  }) => shadow.modal};

  ${({
    fullScreen,
    theme: {
      box: { round }
    }
  }): CSSObject =>
    !fullScreen
      ? {
          borderRadius: round['16']
        }
      : {
          width: '100%',
          height: '100%'
        }};

  opacity: 0;
  visibility: hidden;
  transform: scale(0.7, 0.7);
  transition: opacity ${({ transitionDuration }) => transitionDuration}ms cubic-bezier(0, 0, 0.2, 1),
    transform ${({ transitionDuration }) => transitionDuration}ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  z-index: ${({ theme: { zIndex } }) => zIndex.dialog};
  overflow-y: auto;

  ${({ dialogOpen }): CSSObject =>
    dialogOpen
      ? {
          opacity: 1,
          visibility: 'visible',
          transform: 'scale(1, 1)'
        }
      : {}};
  ${({ dialogClose }): CSSObject =>
    dialogClose
      ? {
          opacity: 0,
          transform: 'scale(0.7, 0.7)'
        }
      : {}};
`;
