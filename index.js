// Delay loading any function until the html dom has loaded. All functions are
// defined in this top level function to ensure private scope.
jQuery(document).ready(function () {

  // Installs error handling.
  jQuery.ajaxSetup({
    error: function (resp, e) {
      if (resp.status == 0) {
        alert('You are offline!!\n Please Check Your Network.')
      } else if (resp.status == 404) {
        alert('Requested URL not found.')
      } else if (resp.status == 500) {
        alert('Internel Server Error:\n\t' + resp.responseText)
      } else if (e == 'parsererror') {
        alert('Error.\nParsing JSON Request failed.')
      } else if (e == 'timeout') {
        alert('Request timeout.')
      } else {
        alert('Unknown Error.\n' + resp.responseText)
      }
    }
  }) // error:function()
  let svgDiv = jQuery('#graphviz_svg_div')

  jQuery(document).on('click', '.graph-link', function (event) {
    let width = window.innerWidth,
      height = window.innerHeight

    event.preventDefault()
    svgDiv.html('')
    let url = $(this).attr('href')
    fetch(url).then((resp) => resp.text()).then(data => {
      let svg = Viz(data, 'svg')
      svgDiv.html(svg)
      let viewBox = $('#graphviz_svg_div > svg')

      let zoomer = svgPanZoom('svg', {
        zoomScaleSensitivity: 0.4,
        minZoom: 0.1,
        maxZoom: 10,
        fit: false,
        center: true,
        refreshRate: 'auto'
      })
      let sizes = zoomer.getSizes()
      viewBox.attr("height", height)
      viewBox.attr("width", width)

      zoomer.zoom(width / sizes.width)
      sizes = zoomer.getSizes()
      console.log(sizes)
      let y = 0
      if (sizes.height < height) {
        y = (height - sizes.height) / 2
      }else{
        y = sizes.height/(sizes.height/height) - height
      }
      zoomer.pan({
        x: 0,
        y: y,
      })
    })
  })
})