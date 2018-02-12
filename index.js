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


  var svg_div = jQuery('#graphviz_svg_div')
  var graphviz_data_textarea = jQuery('#graphviz_data')

  function InsertGraphvizText(text) {
    graphviz_data_textarea.val(text)
  }

  jQuery(document).on('click', '.graph-link', function (event) {
    event.preventDefault()
    svg_div.html("")
    let url = $(this).attr("href")
    fetch(url).then((resp) => resp.text()).then(data => {
      var svg = Viz(data, "svg")
      svg_div.html("<hr>" + svg)
    })
  })
})