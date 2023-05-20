import type { ForwardedRef, HTMLAttributes } from 'react';

import type { GenericComponentProps } from '@mrcamelhub/camel-ui';

export interface DialogProps {
  ref?: ForwardedRef<HTMLDivElement>;
  open?: boolean;
  transitionDuration?: number;
  fullScreen?: boolean;
  disablePadding?: boolean;
  disableFullScreenSwipeable?: boolean;
  onClose?: () => void;
}

export type DialogComponentProps = DialogProps &
  GenericComponentProps<Omit<HTMLAttributes<HTMLDivElement>, 'onClick'>>;

export interface DialogState {
  id: number;
  open: boolean;
  close: boolean;
  openTimer: ReturnType<typeof setTimeout>;
  props: DialogComponentProps;
}
