declare namespace musicalapp{
  type RuntimeMessage =
    { type: 'INIT_RECORDING' } |
    { type: 'STOP_RECORDING' } |
    { type: 'FINISH_RECORDING', payload: { src: string } }
}
