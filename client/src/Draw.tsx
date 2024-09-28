function Draw(props: {isPitching: boolean}) {
  return (
    props.isPitching
    ? "placeholder for drawable canvas & toolbar"
    : "placeholder for nondrawable canvas (no toolbar)"
  )
}

export default Draw
