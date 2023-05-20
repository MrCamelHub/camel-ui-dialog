import { forwardRef, useContext, useEffect, useRef, useState } from 'react';

import createUniqueId from '@utils/createUniqId';
import dialogStatesContext from '@context/DialogStatesContext';

import type { DialogComponentProps } from '@types';

const Dialog = forwardRef<HTMLDivElement, DialogComponentProps>(function Dialog(
  { children, open, transitionDuration = 225, ...props },
  ref
) {
  const [dialogStates, setDialogStates] = useContext(dialogStatesContext);
  const [id, setId] = useState(0);

  const initializedRef = useRef(false);

  useEffect(() => {
    if (open && !id) setId(createUniqueId('dialog'));
  }, [open, id]);

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
            ...props
          }
        })
      );
    }
  }, [open, id, setDialogStates, transitionDuration, children, props, ref, dialogStates]);

  useEffect(() => {
    const hasCurrentOpenDialog = dialogStates.some(
      ({ id: dialogId, open: openDialog }) => dialogId === id && openDialog
    );

    if (hasCurrentOpenDialog) {
      setDialogStates((prevDialogStates) =>
        prevDialogStates.map((prevDialogState) => ({
          ...prevDialogState,
          props: {
            ...prevDialogState.props,
            children: prevDialogState.id === id ? children : prevDialogState.props.children
          }
        }))
      );
    }
  }, [dialogStates, id, children, setDialogStates]);

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

  return null;
});

export default Dialog;
