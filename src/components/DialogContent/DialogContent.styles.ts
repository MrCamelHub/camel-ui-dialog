import styled, { CSSObject } from '@emotion/styled';

import { DialogProps } from '@types';

export const StyledDialogContent = styled.div<
  Pick<DialogProps, 'fullScreen' | 'transitionDuration' | 'renderScope' | 'disablePadding'> & {
    dialogOpen: boolean;
    dialogClose: boolean;
  }
>`
  ${({ renderScope, fullScreen }): CSSObject => {
    let cssObject: CSSObject = {};

    if (renderScope === 'component' && !fullScreen) {
      cssObject = {
        position: 'fixed',
        top: '50%',
        left: '50%'
      };
    } else if (renderScope === 'component') {
      cssObject = {
        position: 'fixed',
        top: 0,
        left: 0
      };
    }

    return cssObject;
  }}

  width: ${({ renderScope }) => (renderScope === 'component' ? 'calc(100% - 64px)' : '100%')};
  padding: 32px 20px 20px;
  text-align: center;

  background-color: ${({
    theme: {
      palette: { common }
    }
  }) => common.bg01};

  ${({
    theme: {
      box: { round }
    },
    renderScope,
    fullScreen
  }): CSSObject => {
    let cssObject: CSSObject = {
      width: '100%',
      height: '100%',
      padding: 20,
      textAlign: 'inherit'
    };

    if (!fullScreen && renderScope === 'component') {
      cssObject = {
        margin: '20px 32px',
        borderRadius: round['16']
      };
    } else if (!fullScreen) {
      cssObject = {
        borderRadius: round['16']
      };
    }

    return cssObject;
  }};

  ${({ disablePadding }): CSSObject => (disablePadding ? { padding: 0 } : {})}

  opacity: 0;
  visibility: hidden;

  ${({ renderScope, fullScreen }): CSSObject => {
    let cssObject: CSSObject = {
      visibility: 'visible',
      transform: 'scale(0.7, 0.7)'
    };

    if (renderScope === 'component' && !fullScreen) {
      cssObject = {
        visibility: 'visible',
        transform: 'translate(calc(-50% - 32px), -50%) scale(0.7, 0.7)'
      };
    }

    return cssObject;
  }};

  transition: opacity ${({ transitionDuration }) => transitionDuration}ms cubic-bezier(0, 0, 0.2, 1),
    transform ${({ transitionDuration }) => transitionDuration}ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  z-index: ${({ theme: { zIndex } }) => zIndex.dialog};
  overflow-y: auto;

  ${({ dialogOpen, renderScope, fullScreen }): CSSObject => {
    let cssObject: CSSObject = {};

    if (dialogOpen && renderScope === 'component' && !fullScreen) {
      cssObject = {
        opacity: 1,
        visibility: 'visible',
        transform: 'translate(calc(-50% - 32px), -50%) scale(1, 1)'
      };
    } else if (dialogOpen) {
      cssObject = {
        opacity: 1,
        visibility: 'visible',
        transform: 'scale(1, 1)'
      };
    }

    return cssObject;
  }};

  ${({ dialogClose, renderScope, fullScreen }): CSSObject => {
    let cssObject: CSSObject = {};

    if (dialogClose && renderScope === 'component' && !fullScreen) {
      cssObject = {
        opacity: 0,
        transform: 'translate(calc(-50% - 32px), -50%) scale(0.7, 0.7)'
      };
    } else if (dialogClose) {
      cssObject = {
        opacity: 0,
        transform: 'scale(0.7, 0.7)'
      };
    }

    return cssObject;
  }};
`;
