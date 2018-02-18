const masterUrl = 'https://api.github.com/repos/GenesisKernel/apps/git/trees/master'
const baseLink = '<a href="https://raw.githubusercontent.com/GenesisKernel/apps/master/src/'

function createLinks() {
  fetch(masterUrl).then(resp => resp.json()).then(data => {
    data.tree.forEach(el => {
      if (el.type == 'tree' && el.path == 'src'){
        fetch(el.url).then(resp => resp.json()).then(data => {
          
          data.tree.forEach(e =>{
            let a = $(`${baseLink}${e.path}/struct.dot" class="graph-link" title="${e.path}">${e.path}</a><br>`)
            $('#menu_list').append(a)
          })
        })
      }
    });
  })
}

$(document).ready(function () {
  createLinks()

  let svgDiv = $('#graphviz_svg_div')

  $(document).on('click', '.graph-link', function (event) {
    let width = window.innerWidth,
      height = window.innerHeight

    event.preventDefault()
    svgDiv.html('')
    let url = $(this).attr('href')
    fetch(url).then(resp => resp.text()).then(data => {
      let svg = Viz(data, 'svg')
      svgDiv.html(svg)
      let viewBox = $('#graphviz_svg_div > svg')

      let zoomer = svgPanZoom('svg', {
        zoomScaleSensitivity: 0.4,
        minZoom: 0.1,
        maxZoom: 50,
        fit: false,
        center: true,
        refreshRate: 'auto'
      })
      let sizes = zoomer.getSizes()
      viewBox.attr("height", height)
      viewBox.attr("width", width)

      zoomer.zoom(width / sizes.width)
      sizes = zoomer.getSizes()
      
      let y = 0
      if (sizes.height < height) {
        y = (height - sizes.height) / 2
      } else {
        y = sizes.height / (sizes.height / height) - height
      }
      zoomer.pan({
        x: 0,
        y: y,
      })
    })
  })
})