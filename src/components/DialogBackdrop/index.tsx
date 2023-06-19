import type { HTMLAttributes, PropsWithChildren } from 'react';
import { forwardRef } from 'react';

import type { DialogState } from '@types';

import { StyledDialogBackdrop } from './DialogBackdrop.styles';

const DialogBackdrop = forwardRef<
  HTMLDivElement,
  PropsWithChildren<
    HTMLAttributes<HTMLDivElement> &
      Omit<PropsWithChildren<DialogState>, 'id' | 'ref' | 'openTimer'>
  >
>(function DialogBackdrop(
  { children, open, close, props: { transitionDuration, fullScreen, onClose } },
  ref
) {
  return (
    <StyledDialogBackdrop
      ref={ref}
      dialogOpen={open}
      dialogClose={close}
      transitionDuration={transitionDuration}
      fullScreen={fullScreen}
      onClick={onClose}
    >
      {children}
    </StyledDialogBackdrop>
  );
});

export default DialogBackdrop;
