const chartDataReducer = (state = [{ value: 0, color: '#8b4513' },
  { value: 0, color: '#cd853f' },
  { value: 0, color: '#7d8ca3' }], action) => {
  switch (action.type) {
    case 'GET_CHART_DATA':
      return action.chartData
    default:
      return state
  }
}

export default chartDataReducer
