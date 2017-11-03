const chartDataReducer = (state = [{ value: 0, key: 'white', color: '#8b4513' },
  { value: 0, key: 'black', color: '#cd853f' },
  { value: 0, key: 'draw', color: 'gray' }], action) => {
  switch (action.type) {
    case 'GET_CHART_DATA':
      return action.chartData
    default:
      return state
  }
}

export default chartDataReducer
