import { useState } from 'react';
import type { RefAttributes } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { Button, Input, Typography } from '@mrcamelhub/camel-ui';
import Dialog from '@components/Dialog';

import type { DialogProps } from '@types';

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
        {args?.fullScreen && (
          <Typography
            weight="bold"
            customStyle={{
              marginTop: 8
            }}
          >
            아래로 스와이프해서 닫을 수 있어요!
          </Typography>
        )}
      </Dialog>
    </>
  );
}

function NestedDialogWithHooks(args: DialogProps & RefAttributes<HTMLDivElement>) {
  const [open, setOpen] = useState(false);
  const [openSecondDialog, setOpenSecondDialog] = useState(false);
  const [openThirdDialog, setOpenThirdDialog] = useState(false);

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
            setOpenSecondDialog(true);
          }}
        >
          Open Second Dialog
        </Button>
      </Dialog>
      <Dialog
        {...args}
        open={openSecondDialog}
        onClose={() => setOpenSecondDialog(false)}
        renderScope="component"
      >
        <Typography
          customStyle={{
            marginBottom: 8
          }}
        >
          Camel Dialog (Render Scope: component)
        </Typography>
        <Button
          variant="solid"
          brandColor="primary"
          onClick={() => {
            setOpenSecondDialog(false);
            setOpenThirdDialog(true);
          }}
        >
          Open Third Dialog
        </Button>
      </Dialog>
      <Dialog {...args} open={openThirdDialog} onClose={() => setOpenThirdDialog(false)}>
        <Typography>Camel Dialog</Typography>
      </Dialog>
    </>
  );
}

function RenderScopeDialogWithHooks(args: DialogProps & RefAttributes<HTMLDivElement>) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <>
      <Button variant="solid" brandColor="primary" onClick={() => setOpen(true)}>
        Open Dialog
      </Button>
      <Dialog {...args} open={open} onClose={() => setOpen(false)}>
        <Typography>Camel Dialog</Typography>
        <Input
          onChange={(e) => setValue(e.currentTarget.value)}
          value={value}
          placeholder="입력해 주세요."
          customStyle={{
            marginTop: 8
          }}
        />
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

export const RenderScope: Story = {
  render: (args) => <RenderScopeDialogWithHooks {...args} renderScope="component" />
};
