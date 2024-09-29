import { useEffect, useRef, useState } from 'react';

function Draw(props: {isPitching: boolean}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [points, setPoints] = useState<{points: {x: number, y: number}[], color: boolean, size: number}[]>([])

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

    for (const row of points) {
      ctx.current.strokeStyle = row.color ? 'white' : 'black'
      ctx.current.lineWidth = row.size;
      ctx.current.beginPath()

      if (row.points.length > 0) {
        ctx.current.moveTo(row.points[0].x, row.points[0].y)

        for (let i = 0; i < row.points.length; i++) {
          ctx.current.lineTo(row.points[i].x, row.points[i].y)
        }
      }
    
      ctx.current.stroke()
    }
  }, [points])

  return (
    <section style={{
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem"
    }}>
      <div id="toolbar" style={{
        display: "flex",
        gap: "0.25rem",
      }}>{props.isPitching && <><button style={{padding: "0.25rem", border: "0.125rem solid black", borderRadius: "0.5rem"}} id="toggle">Toggle Eraser</button>
        <button style={{padding: "0.25rem", border: "0.125rem solid black", borderRadius: "0.5rem"}} id="clear">Clear</button></>}
        <div style={{
          position: "relative",
        }}>
          <label style={{
            padding: "0.25rem",
            position: "absolute",
            zIndex: "-1",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }} htmlFor="lineWidth">Stroke</label>
          <input style={{
            backgroundColor: "transparent"
          }} id="lineWidth" name='lineWidth' type="number"
            value={lineWidth} onChange={e => setLineWidth(Number((e.target as HTMLInputElement).value))} />
        </div>
      </div>
      <div className="drawing-board">
        <canvas ref={canvasRef} id="drawing-board" width={540} height={320}
          style={{border: "solid black 1px"}}
          onMouseDown={() => {
            setMouseDown(true)
            setPoints((points) => {
              const new_points = JSON.parse(JSON.stringify(points));
              new_points.push({ points: [], color: eraser, size: lineWidth })
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
              new_points[new_points.length-1].points.push(point);
              return new_points
            })

            console.log(points)
        }} />
      </div>
    </section>
  )
}

export default Draw
