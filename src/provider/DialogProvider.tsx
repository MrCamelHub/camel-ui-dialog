import type { PropsWithChildren } from 'react';
import { useState } from 'react';

import DialogRenderProvider from '@provider/DialogRootProvider';
import DialogStatesContext from '@context/DialogStatesContext';

import type { DialogState } from '@types';

function DialogProvider({ children }: PropsWithChildren) {
  const value = useState<DialogState[]>([]);

  return (
    <DialogStatesContext.Provider value={value}>
      {children}
      <DialogRenderProvider />
    </DialogStatesContext.Provider>
  );
}

export default DialogProvider;
