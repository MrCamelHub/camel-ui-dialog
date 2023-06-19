import type { MouseEvent, PropsWithChildren, TouchEvent } from 'react';
import { useRef, useState } from 'react';

import type { DialogState } from '@types';

import { StyledDialogContent } from './DialogContent.styles';

function DialogContent({
  children,
  open,
  close,
  props: {
    children: propsChildren,
    onClose,
    fullScreen,
    transitionDuration = 225,
    disableFullScreenSwipeable,
    renderScope,
    customStyle,
    ...props
  }
}: Omit<PropsWithChildren<DialogState>, 'id' | 'ref' | 'openTimer'>) {
  const [swipeable, setSwipeable] = useState(false);

  const dialogContentRef = useRef<HTMLDivElement | null>(null);
  const dialogSwipeableTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const measureRef = useRef({
    startClientY: 0,
    lastTranslateY: 0
  });

  const handleClick = (event: MouseEvent<HTMLDivElement>) => event.stopPropagation();

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (!dialogContentRef.current) {
      dialogContentRef.current = document.getElementById(
        'camel-ui-dialog-content'
      ) as HTMLDivElement;
    }

    if (disableFullScreenSwipeable || !fullScreen || !dialogContentRef.current) return;

    measureRef.current.startClientY = event.clientY;
    setSwipeable(true);
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!swipeable || !dialogContentRef.current) return;

    let translateY = event.clientY - measureRef.current.startClientY;

    if (translateY <= 0) {
      translateY = 0;
    }

    dialogContentRef.current.setAttribute('style', `transform: translateY(${translateY}px)`);
    measureRef.current.lastTranslateY = translateY;
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (disableFullScreenSwipeable || !fullScreen || !dialogContentRef.current) return;

    if (dialogContentRef.current.scrollTop > 0) return;

    measureRef.current.startClientY = event.touches[0].clientY;
    setSwipeable(true);
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (!swipeable || !dialogContentRef.current) return;

    let translateY = event.touches[0].clientY - measureRef.current.startClientY;

    if (translateY <= 0) {
      translateY = 0;
    }

    dialogContentRef.current.setAttribute('style', `transform: translateY(${translateY}px)`);
    measureRef.current.lastTranslateY = translateY;
  };

  const handleEndSwipeable = () => {
    if (!swipeable || !dialogContentRef.current) return;

    const swipedPercentage =
      (measureRef.current.lastTranslateY / (dialogContentRef.current.clientHeight || 0)) * 100;

    if (swipedPercentage >= 10) {
      dialogContentRef.current.setAttribute('style', 'transform: translateY(100%)');
      dialogSwipeableTimerRef.current = setTimeout(() => {
        if (onClose && typeof onClose === 'function') onClose();
      }, transitionDuration);
    } else {
      dialogContentRef.current.removeAttribute('style');
    }

    setSwipeable(false);
    measureRef.current = {
      startClientY: 0,
      lastTranslateY: 0
    };
  };

  return (
    <StyledDialogContent
      id="camel-ui-dialog-content"
      ref={dialogContentRef}
      dialogOpen={open}
      dialogClose={close}
      transitionDuration={transitionDuration}
      fullScreen={fullScreen}
      renderScope={renderScope}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleEndSwipeable}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleEndSwipeable}
      {...props}
      css={customStyle}
      role="dialog"
    >
      {renderScope === 'component' ? children : propsChildren}
    </StyledDialogContent>
  );
}

export default DialogContent;
