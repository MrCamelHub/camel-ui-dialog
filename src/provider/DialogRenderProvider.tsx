import { useContext, useEffect, useRef, useState } from 'react';
import type { MouseEvent, TouchEvent } from 'react';

import { createPortal } from 'react-dom';
import dialogStatesContext from '@context/DialogStatesContext';
import { StyledDialog, Wrapper } from '@components/Dialog/Dialog.styles';

function DialogRenderProvider() {
  const [dialogStates, setDialogStates] = useContext(dialogStatesContext);

  const [isMounted, setIsMounted] = useState(false);
  const [swipeable, setSwipeable] = useState(false);

  const dialogRootPortalRef = useRef<HTMLDivElement | null>();
  const dialogRef = useRef<HTMLDivElement>(null);
  const dialogSwipeableTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const measureRef = useRef({
    startClientY: 0,
    lastTranslateY: 0
  });

  const handleClick = (event: MouseEvent<HTMLDivElement>) => event.stopPropagation();

  const handleMouseDown =
    (disableFullScreenSwipeable?: boolean, fullScreen?: boolean) =>
    (event: MouseEvent<HTMLDivElement>) => {
      if (disableFullScreenSwipeable || !fullScreen || !dialogRef.current) return;

      measureRef.current.startClientY = event.clientY;
      setSwipeable(true);
    };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!swipeable || !dialogRef.current) return;

    let translateY = event.clientY - measureRef.current.startClientY;

    if (translateY <= 0) {
      translateY = 0;
    }

    dialogRef.current.setAttribute('style', `transform: translateY(${translateY}px)`);
    measureRef.current.lastTranslateY = translateY;
  };

  const handleTouchStart =
    (disableFullScreenSwipeable?: boolean, fullScreen?: boolean) =>
    (event: TouchEvent<HTMLDivElement>) => {
      if (disableFullScreenSwipeable || !fullScreen || !dialogRef.current) return;

      if (dialogRef.current.scrollTop > 0) return;

      measureRef.current.startClientY = event.touches[0].clientY;
      setSwipeable(true);
    };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (!swipeable || !dialogRef.current) return;

    let translateY = event.touches[0].clientY - measureRef.current.startClientY;

    if (translateY <= 0) {
      translateY = 0;
    }

    dialogRef.current.setAttribute('style', `transform: translateY(${translateY}px)`);
    measureRef.current.lastTranslateY = translateY;
  };

  const handleEndSwipeable = (transitionDuration?: number, onClose?: () => void) => () => {
    if (!swipeable || !dialogRef.current) return;

    const swipedPercentage =
      (measureRef.current.lastTranslateY / (dialogRef.current.clientHeight || 0)) * 100;

    if (swipedPercentage >= 10) {
      dialogRef.current.setAttribute('style', 'transform: translateY(100%)');
      dialogSwipeableTimerRef.current = setTimeout(() => {
        if (onClose && typeof onClose === 'function') onClose();
      }, transitionDuration);
    } else {
      dialogRef.current.removeAttribute('style');
    }

    setSwipeable(false);
    measureRef.current = {
      startClientY: 0,
      lastTranslateY: 0
    };
  };

  useEffect(() => {
    if (dialogStates.length) {
      const dialogRoot = document.getElementById('dialog-root') as HTMLDivElement;

      document.body.style.overflow = 'hidden';

      if (!dialogRoot) {
        const newDialogRoot = document.createElement('div');
        newDialogRoot.id = 'dialog-root';
        newDialogRoot.style.position = 'fixed';
        newDialogRoot.style.top = '0';
        newDialogRoot.style.left = '0';
        newDialogRoot.style.width = '100%';
        newDialogRoot.style.height = '100%';
        newDialogRoot.style.zIndex = '20';
        newDialogRoot.setAttribute('role', 'presentation');

        dialogRootPortalRef.current = newDialogRoot;

        document.body.append(newDialogRoot);

        setIsMounted(true);
      } else {
        dialogRootPortalRef.current = dialogRoot;

        setIsMounted(true);
      }
    } else {
      document.body.removeAttribute('style');

      if (dialogRootPortalRef.current) {
        dialogRootPortalRef.current?.remove();
        dialogRootPortalRef.current = null;
      } else {
        const dialogRoot = document.getElementById('dialog-root') as HTMLDivElement;

        if (dialogRoot) dialogRoot.remove();
      }

      setIsMounted(false);
    }
  }, [dialogStates]);

  useEffect(() => {
    dialogStates
      .filter(({ close }) => close)
      .forEach(({ id, props: { transitionDuration, onClose } }) => {
        setTimeout(() => {
          setDialogStates((sPrevDialogStates) =>
            sPrevDialogStates.filter((sPrevDialogState) => id !== sPrevDialogState.id)
          );
          if (onClose && typeof onClose === 'function') {
            onClose();
          }
        }, transitionDuration);
      });
  }, [dialogStates, setDialogStates]);

  if (!isMounted || !dialogRootPortalRef.current) return null;

  return createPortal(
    dialogStates.map(
      ({
        id,
        open,
        close,
        props: {
          ref,
          children,
          transitionDuration,
          fullScreen,
          disableFullScreenSwipeable,
          onClose,
          customStyle,
          ...props
        }
      }) => (
        <Wrapper
          key={`dialog-${id}`}
          ref={ref}
          dialogOpen={open}
          dialogClose={close}
          transitionDuration={transitionDuration}
          fullScreen={fullScreen}
          onClick={onClose}
        >
          <StyledDialog
            ref={dialogRef}
            dialogOpen={open}
            dialogClose={close}
            transitionDuration={transitionDuration}
            fullScreen={fullScreen}
            onClick={handleClick}
            onMouseDown={handleMouseDown(disableFullScreenSwipeable, fullScreen)}
            onMouseMove={handleMouseMove}
            onMouseUp={handleEndSwipeable(transitionDuration, onClose)}
            onTouchStart={handleTouchStart(disableFullScreenSwipeable, fullScreen)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleEndSwipeable(transitionDuration, onClose)}
            {...props}
            css={customStyle}
            role="dialog"
          >
            {children}
          </StyledDialog>
        </Wrapper>
      )
    ),
    dialogRootPortalRef.current
  );
}

export default DialogRenderProvider;
