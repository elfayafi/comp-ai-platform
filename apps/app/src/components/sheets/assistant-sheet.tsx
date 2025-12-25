'use client';

import { useMediaQuery } from '@compiel/ui/hooks';
import { Sheet, SheetContent } from '@compiel/ui/sheet';

import { Drawer, DrawerContent, DrawerTitle } from '@compiel/ui/drawer';
import '@compiel/ui/editor.css';
import { useQueryState } from 'nuqs';
import Chat from '../ai/chat';

export function AssistantSheet() {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const [isOpen, setIsOpen] = useQueryState('assistant', {
    history: 'push',
    parse: (value) => value === 'true',
    serialize: (value) => value.toString(),
  });

  if (isDesktop) {
    return (
      <Sheet open={isOpen ?? false} onOpenChange={setIsOpen}>
        <SheetContent>
          <Chat />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={isOpen ?? false} onOpenChange={setIsOpen}>
      <DrawerTitle hidden>Assistant</DrawerTitle>
      <DrawerContent className="p-6">
        <Chat />
      </DrawerContent>
    </Drawer>
  );
}
