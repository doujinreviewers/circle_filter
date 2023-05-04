"use strict";
{
  let type1_cells = document.querySelectorAll(".work_1col_table.n_worklist > tbody > tr");
  let type3_cells = document.querySelectorAll("#search_result_img_box > li");

  chrome.storage.local.get({
    ng_circles: "",
    show_ng_count: false
  },(settings)=>{
    let ng_arr = settings.ng_circles.split(/\r\n|\n/);
    let cells = type1_cells.length != 0 ? type1_cells : type3_cells;
    let ngcount = 0;

    Array.from(cells).forEach((cell) => {
      let maker_name = cell.querySelector(".maker_name").textContent;
      let circle_number = cell.querySelector(".maker_name a").href.match(/RG\d*/)[0]

      let result = ng_arr.some((pattern) => {
        return pattern && (maker_name == pattern || circle_number == pattern)
      });

      if (result){
        cell.remove();
        ngcount++;
      }
    })

    if (settings.show_ng_count) {
      let dom = document.querySelector("#wrapper");
      let mo = new MutationObserver(function(record, observer) {
        let page_total = document.querySelector(".page_total");
        if(page_total){
          page_total.innerHTML = page_total.innerHTML + `<strong>-${ngcount}</strong>件`
          mo.disconnect();
        }
      });
      let config = {
        childList: true,
        subtree: true
      };
      mo.observe(dom, config);
    }

  });

}