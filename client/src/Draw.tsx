import { useEffect, useRef, useState } from 'react';

function Draw(props: {isPitching: boolean}) {
  // Use a ref to reference the actual canvas DOM element
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  let ctx: CanvasRenderingContext2D;
  let isEraser = false;
  let isPainting = false;
  let startX: number;
  let startY: number;

  const [lineWidth, setLineWidth] = useState(5);

  // Access the canvas context in useEffect once the component is mounted
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
        ctx = canvas.getContext('2d')!;
    }
  });

  return (
    <section style={{
      display: "flex",
      flexDirection: "column",
    }}>
      <div id="toolbar" style={{
        display: "flex",
        gap: "20px",
      }} onClick={e => {
        const input = e.target as HTMLInputElement;

        if (input.id === 'clear') {
          ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        }

        if (input.id === 'toggle') {
          isEraser = !isEraser;
          ctx.strokeStyle = isEraser ? "white" : "black";
        }
      }}>
        {props.isPitching && <><button id="toggle">Toggle Eraser</button>
        <label htmlFor="lineWidth">Stroke Width</label>
        <input id="lineWidth" name='lineWidth' type="number"
          value={lineWidth} onChange={e => setLineWidth(Number((e.target as HTMLInputElement).value))} />
        <button id="clear">Clear</button></>}
      </div>
      <div className="drawing-board">
        {props.isPitching
        ? <canvas ref={canvasRef} id="drawing-board" width={500} height={500}
          style={{border: "solid black 1px"}}
          onMouseDown={e => {
          isPainting = true;
          startX = e.clientX;
          startY = e.clientY;
        }} onMouseUp={() => {
          isPainting = false;
          ctx.stroke();
          ctx.beginPath();
        }} onMouseMove={e => {
          if (!isPainting) return;

          console.log(lineWidth);
          ctx.lineWidth = lineWidth;
          ctx.lineCap = 'round';

          ctx.lineTo(e.clientX - canvasRef.current!.offsetLeft, e.clientY - canvasRef.current!.offsetTop);
          ctx.stroke();
        }} />
        : <canvas ref={canvasRef} style={{border: "solid black 1px"}} id="drawing-board" width={500} height={500} />}
      </div>
    </section>
  )
}

export default Draw
