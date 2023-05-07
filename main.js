"use strict";
{
  let judge = (ng_circles, maker_name_or_circle_number) => {
    return ng_circles.some((pattern) => {
      return pattern && pattern == maker_name_or_circle_number
    });
  }

  let getMakerNameAndCircleNumber = (cell) => {
    return {
      maker_name: cell.querySelector(".maker_name a").textContent.trim(),
      circle_number: cell.querySelector(".maker_name a").href.match(/RG\d*/)[0]
    };
  }

  let type1_cells = document.querySelectorAll(".work_1col_table.n_worklist > tbody > tr");
  let type3_cells = document.querySelectorAll("#search_result_img_box > li");

  chrome.storage.local.get({
    ng_circles: "",
    show_ng_count: false,
    enable_search: false
  },(settings)=>{

    if(!settings.enable_search){
      return;
    }

    let ng_arr = settings.ng_circles.split(/\r\n|\n/);
    let cells = type1_cells.length != 0 ? type1_cells : type3_cells;
    let ngcount = 0;

    Array.from(cells).forEach((cell) => {
      let { maker_name, circle_number } = getMakerNameAndCircleNumber(cell);

      if (judge(ng_arr, maker_name) || judge(ng_arr, circle_number)){
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