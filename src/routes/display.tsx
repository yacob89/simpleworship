import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { communicationService } from '../services/communication.service';
import { DisplayState } from '../models/display-state';
import type { IDisplayState } from '../models/display-state';

export const Route = createFileRoute('/display')({
  component: LiveDisplay,
});

/**
 * Live Display Screen for projection.
 * Listens for state changes via the communication service.
 */
function LiveDisplay() {
  const [state, setState] = useState<IDisplayState>(DisplayState.empty());

  useEffect(() => {
    // Subscribe to state changes from the controller tab.
    const cleanup = communicationService.onReceive((newState) => {
      setState(newState);
    });

    return cleanup;
  }, []);

  if (!state.content) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-gray-500">
        <p className="text-2xl italic">Ready to display...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-12 py-8 text-white">
      <section className="flex flex-1 flex-col items-center justify-center text-center">
        {/* Large, centered paragraph content */}
        <p
          className="whitespace-pre-wrap text-5xl font-bold leading-tight sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
        >
          {state.content}
        </p>
      </section>

      {/* Footer with song details (minimal) */}
      <footer className="mt-8 flex w-full justify-end border-t border-white/20 pt-4 opacity-50">
        <div className="text-right">
          <p className="text-xl font-semibold">{state.title}</p>
          <p className="text-sm">{state.artist}</p>
        </div>
      </footer>
    </main>
  );
}
