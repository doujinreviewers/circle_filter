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

  chrome.storage.local.get({
    ng_circles: "",
    show_ng_count: false,
    enable_announce: false
  },(settings)=>{

    if(!settings.enable_announce){
      return;
    }

    let ng_arr = settings.ng_circles.split(/\r\n|\n/);
    let cells = document.querySelectorAll(".n_worklist_item");
    let ngcount = 0;

    Array.from(cells).forEach((cell) => {
      let { maker_name, circle_number } = getMakerNameAndCircleNumber(cell);

      if (judge(ng_arr, maker_name) || judge(ng_arr, circle_number)){
        cell.remove();
        ngcount++;
      }
    })

    if (settings.show_ng_count) {
      let heading = document.querySelector("h3.work_update");
      if(heading){
        heading.innerHTML = heading.innerHTML + `<strong>-${ngcount}</strong>件`
      }
    }

  });

}