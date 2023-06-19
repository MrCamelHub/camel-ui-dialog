import { useContext, useEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';
import DialogStatesContext from '@context/DialogStatesContext';
import DialogContent from '@components/DialogContent';
import DialogBackdrop from '@components/DialogBackdrop';

function DialogRenderProvider() {
  const [dialogStates, setDialogStates] = useContext(DialogStatesContext);

  const [isMounted, setIsMounted] = useState(false);

  const dialogRootPortalRef = useRef<HTMLDivElement | null>();

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
        props: { ref, transitionDuration, fullScreen, onClose, renderScope, ...props }
      }) => (
        <DialogBackdrop
          key={`dialog-${id}`}
          ref={ref}
          open={open}
          close={close}
          props={{
            transitionDuration,
            fullScreen,
            onClose,
            renderScope,
            ...props
          }}
          onClick={onClose}
        >
          {renderScope !== 'component' && (
            <DialogContent
              open={open}
              close={close}
              props={{
                transitionDuration,
                fullScreen,
                onClose,
                renderScope,
                ...props
              }}
            />
          )}
        </DialogBackdrop>
      )
    ),
    dialogRootPortalRef.current
  );
}

export default DialogRenderProvider;
