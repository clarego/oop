import { useCallback } from 'react';

interface Props {
  onDrag: (incrementalDelta: number) => void;
}

export default function ResizeHandle({ onDrag }: Props) {
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      let prevX = e.clientX;

      const onMouseMove = (ev: MouseEvent) => {
        const delta = ev.clientX - prevX;
        prevX = ev.clientX;
        if (delta !== 0) onDrag(delta);
      };

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };

      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    [onDrag],
  );

  return (
    <div
      onMouseDown={handleMouseDown}
      className="group relative flex-shrink-0 cursor-col-resize select-none"
      style={{ width: '4px', background: '#1a1a1a', zIndex: 10 }}
    >
      <div className="absolute inset-y-0 -left-1.5 -right-1.5 group-hover:bg-[#007ACC]/25 transition-colors duration-100" />
      <div
        className="absolute inset-y-0 left-px w-px group-hover:bg-[#007ACC] transition-colors duration-100"
        style={{ background: '#2a2a2a' }}
      />
    </div>
  );
}
