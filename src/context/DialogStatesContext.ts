import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

import type { DialogState } from '@types';

const DialogStatesContext = createContext<[DialogState[], Dispatch<SetStateAction<DialogState[]>>]>(
  [[], () => []]
);

export default DialogStatesContext;
