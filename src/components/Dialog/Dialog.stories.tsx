import { useState } from 'react';
import type { RefAttributes } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { Button, Typography } from '@mrcamelhub/camel-ui';

import type { DialogProps } from '@types';

import Dialog from '.';

const meta: Meta<typeof Dialog> = {
  title: 'Dialog',
  component: Dialog
};

export default meta;
type Story = StoryObj<typeof Dialog>;

function DialogWithHooks(args: DialogProps & RefAttributes<HTMLDivElement>) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="solid" brandColor="primary" onClick={() => setOpen(true)}>
        Open Dialog
      </Button>
      <Dialog {...args} open={open} onClose={() => setOpen(false)}>
        <Typography>Camel Dialog</Typography>
      </Dialog>
    </>
  );
}

function NestedDialogWithHooks(args: DialogProps & RefAttributes<HTMLDivElement>) {
  const [open, setOpen] = useState(false);
  const [openNextDialog, setOpenNextDialog] = useState(false);

  return (
    <>
      <Button variant="solid" brandColor="primary" onClick={() => setOpen(true)}>
        Open Dialog
      </Button>
      <Dialog {...args} open={open} onClose={() => setOpen(false)}>
        <Typography
          customStyle={{
            marginBottom: 8
          }}
        >
          Camel Dialog
        </Typography>
        <Button
          variant="solid"
          brandColor="primary"
          onClick={() => {
            setOpen(false);
            setOpenNextDialog(true);
          }}
        >
          Open Next Dialog
        </Button>
      </Dialog>
      <Dialog {...args} open={openNextDialog} onClose={() => setOpenNextDialog(false)}>
        Next Camel Dialog
      </Dialog>
    </>
  );
}

export const Default: Story = {
  render: (args) => <DialogWithHooks {...args} />
};

export const Nested: Story = {
  render: (args) => <NestedDialogWithHooks {...args} />
};

export const FullScreen: Story = {
  render: (args) => <DialogWithHooks {...args} fullScreen />
};
