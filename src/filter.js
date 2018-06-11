import moment from 'moment'
moment.locale('zh-cn')

export let formateDate = function (val) {
  if (val) {
    var date = new Date(val)
    return date.getFullYear() + '/' + date.getMonth() + '/' + date.getDay()
  } else {
    return '-'
  }
}

export let dateDistance = function (val) {
  if (val) {
    return moment(val).fromNow()
  } else {
    return ''
  }
}