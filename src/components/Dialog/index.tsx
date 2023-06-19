import { forwardRef, useContext, useEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';
import createUniqueId from '@utils/createUniqId';
import DialogStatesContext from '@context/DialogStatesContext';
import DialogContent from '@components/DialogContent';

import type { DialogComponentProps, DialogState } from '@types';

const Dialog = forwardRef<HTMLDivElement, DialogComponentProps>(function Dialog(
  { children, open, transitionDuration = 225, renderScope = 'provider', ...props },
  ref
) {
  const [dialogStates, setDialogStates] = useContext(DialogStatesContext);

  const [id] = useState(createUniqueId('dialog'));
  const [dialogState, setDialogState] = useState<DialogState | undefined>();
  const [dialogRootPortal, setDialogRootPortal] = useState<HTMLDivElement | null>(null);

  const initializedRef = useRef(false);

  useEffect(() => {
    setDialogRootPortal(document.getElementById('dialog-root') as HTMLDivElement);
  }, [dialogState]);

  useEffect(() => {
    const hasCurrentOpenDialog = dialogStates.some(({ open: openDialog }) => openDialog);

    if (open && id && !initializedRef.current && !hasCurrentOpenDialog) {
      initializedRef.current = true;
      setDialogStates((prevState) =>
        prevState.concat({
          id,
          open: false,
          close: false,
          openTimer: setTimeout(
            () =>
              setDialogStates((prevDialogStates) =>
                prevDialogStates.map((prevDialogState) => ({
                  ...prevDialogState,
                  open: prevDialogState.id === id ? true : prevDialogState.open
                }))
              ),
            100
          ),
          props: {
            ref,
            children,
            open,
            transitionDuration,
            renderScope,
            ...props
          }
        })
      );
    }
  }, [
    open,
    id,
    setDialogStates,
    transitionDuration,
    renderScope,
    children,
    props,
    ref,
    dialogStates
  ]);

  useEffect(() => {
    setDialogStates((prevDialogStates) =>
      prevDialogStates.map((prevDialogState) => ({
        ...prevDialogState,
        props: {
          ...prevDialogState.props,
          children: prevDialogState.id === id ? children : prevDialogState.props.children
        }
      }))
    );
  }, [setDialogStates, id, children]);

  useEffect(() => {
    if (!open && id && initializedRef.current) {
      initializedRef.current = false;
      setDialogStates((prevDialogStates) =>
        prevDialogStates.map((prevDialogState) => ({
          ...prevDialogState,
          close: id === prevDialogState.id
        }))
      );
    }
  }, [open, id, setDialogStates]);

  useEffect(() => {
    return () => {
      setDialogStates((prevDialogStates) =>
        prevDialogStates.map((prevDialogState) => ({
          ...prevDialogState,
          close: true
        }))
      );
    };
  }, [setDialogStates]);

  useEffect(() => {
    if (renderScope === 'component') {
      setDialogState(dialogStates.find(({ id: dialogStateId }) => dialogStateId === id));
    }
  }, [renderScope, id, dialogStates]);

  if (renderScope !== 'component' || !dialogState || !dialogRootPortal) return null;

  return createPortal(<DialogContent {...dialogState}>{children}</DialogContent>, dialogRootPortal);
});

export default Dialog;
