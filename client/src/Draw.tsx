import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStateContext } from './AppStateContext';

function Draw(props: {isPitching: boolean}) {
  const {socket} = useAppStateContext()

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

    ctx.current.clearRect(0, 0, ctx.current.canvas.width, ctx.current.canvas.height)

    for (const row of points) {
      ctx.current.lineCap = "round"
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

  const [windowX, setWindowX] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowX(window.innerWidth)
    })

    if (!props.isPitching) {
      socket.current?.on("drawed", (image) => {
        setPoints(image)
      })
    }
  }, [])

  return (
    <section style={{
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem"
    }}>
      <div id="toolbar" style={{
        display: "flex",
        gap: "0.25rem",
      }}>{props.isPitching && <><motion.button whileHover={{
          backgroundColor: "white"
      }} onClick={() => {
        setEraser((eraser) => !eraser)
      }} style={{padding: "0.25rem", backgroundColor: "rgb(230, 230, 230)", border: "0.125rem solid black", borderRadius: "0.5rem"}} id="toggle">Toggle Eraser</motion.button>
        <motion.button whileHover={{
          backgroundColor: "white"
      }} onClick={() => {
        socket.current?.emit("draw", [])
        setPoints([])
      }} style={{padding: "0.25rem", backgroundColor: "rgb(230, 230, 230)", border: "0.125rem solid black", borderRadius: "0.5rem"}} id="clear">Clear</motion.button></>}
      {props.isPitching &&
        <div style={{
          position: "relative",
        }}>
         <label style={{
            position: "absolute",
            zIndex: "-1",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }} htmlFor="lineWidth">Stroke</label>
          <motion.input
            whileHover={{
                backgroundColor: "white"
            }}
            style={{
              backgroundColor: "rgb(230, 230, 230)",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              border: "0.125rem solid black",
            }} id="lineWidth" name='lineWidth' type="number"
            value={lineWidth} onChange={e => setLineWidth(Number((e.target as HTMLInputElement).value))} />
        </div>
        }
      </div>
      <div className="drawing-board">
        <canvas ref={canvasRef} id="drawing-board" width={windowX * 0.50} height={windowX * 0.30}
          style={{ 
            border: "solid black 0.125rem", borderRadius: "0.5rem"}}
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
            if (!mouseDown || !props.isPitching) return;

            const point = {x: e.clientX - canvasRef.current!.offsetLeft, y: e.clientY - canvasRef.current!.offsetTop}

            setPoints((points) => {
              const new_points = JSON.parse(JSON.stringify(points));
              new_points[new_points.length-1].points.push(point);
              socket.current?.volatile.emit("draw", new_points)
              return new_points
            })
        }} />
      </div>
    </section>
  )
}

export default Draw
