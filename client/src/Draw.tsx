import { useEffect, useRef, useState } from 'react';

function Draw(props: {isPitching: boolean}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [points, setPoints] = useState<{x: number, y: number}[][]>([])

  const ctx = useRef<CanvasRenderingContext2D>();
  const [eraser, setEraser] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);

  const [lineWidth, setLineWidth] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      ctx.current = canvas.getContext('2d')!;
    }
  }, []);

  useEffect(() => {
    if (!ctx.current) return;

    ctx.current.strokeStyle = 'black'
    ctx.current.lineWidth = lineWidth;
    ctx.current.beginPath()

    for (const row of points) {
      if (row.length > 0) {
        ctx.current.moveTo(row[0].x, row[0].y)

        for (let i = 0; i < row.length; i++) {
          ctx.current.lineTo(row[i].x, row[i].y)
        }
      }
    }

    ctx.current.stroke()
  }, [points])

  return (
    <section style={{
      display: "flex",
      flexDirection: "column",
    }}>
      <div id="toolbar" style={{
        display: "flex",
        gap: "20px",
      }}>{props.isPitching && <><button id="toggle">Toggle Eraser</button>
        <label htmlFor="lineWidth">Stroke Width</label>
        <input id="lineWidth" name='lineWidth' type="number"
          value={lineWidth} onChange={e => setLineWidth(Number((e.target as HTMLInputElement).value))} />
        <button id="clear">Clear</button></>}
      </div>
      <div className="drawing-board">
        <canvas ref={canvasRef} id="drawing-board" width={500} height={500}
          style={{border: "solid black 1px"}}
          onMouseDown={() => {
            setMouseDown(true)
            setPoints((points) => {
              const new_points = JSON.parse(JSON.stringify(points));
              new_points.push([])
              return new_points
            })
          }}
          onMouseUp={() => setMouseDown(false)}
          onMouseMove={e => {
            console.log("hi")

            if (!mouseDown || !props.isPitching) return;

            const point = {x: e.clientX - canvasRef.current!.offsetLeft, y: e.clientY - canvasRef.current!.offsetTop}

            setPoints((points) => {
              const new_points = JSON.parse(JSON.stringify(points));
              new_points[new_points.length-1].push(point);
              return new_points
            })

            console.log(points)
        }} />
      </div>
    </section>
  )
}

export default Draw
