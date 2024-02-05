import React, { useState, useRef, useEffect } from 'react';
import TextToolbar from './text-toolbar';
const SelectableText = ({ children }: { children: React.ReactNode }) => {
  const [selection, setSelection] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleSelection = () => {
    const selectedText = window.getSelection()?.toString() || null;
    setSelection(selectedText);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setSelection(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div ref={containerRef} onMouseUp={handleSelection}>
      {children}
      {selection && <TextToolbar />}
    </div>
  );
};

export default SelectableText;