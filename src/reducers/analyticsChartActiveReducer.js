const analyticsChartAcitveReducer = (state = false, action) => {
  switch (action.type) {
    case 'GET_ANALYTICS_CHART_ACTIVE':
      return action.analyticsChartAcitve
    default:
      return state
  }
}

export default analyticsChartAcitveReducer
