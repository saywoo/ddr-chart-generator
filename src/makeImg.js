const CHART_POSITION_NAME = ["chart-classic", "chart-white", "chart-gold"];
const CATEGORY_TABLE = [".flareskill_classic_table", ".flareskill_white_table", ".flareskill_gold_table"];
const CATEGORY_NAME = ["classic", "white", "gold"];

// 각 난이도별 색깔
const DIFF_COLOR = {"BEGINNER": "rgb(0, 255, 255)", "BASIC": "rgb(255, 255, 0)", "DIFFICULT": "rgb(255, 0, 0)", "EXPERT": "rgb(173, 255, 47)", "CHALLENGE": "rgb(238, 130, 238)"};


let songList;

document.getElementById("dataLoad").addEventListener("change", function (e) {
    console.log(e);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function () {
        songList = JSON.parse(reader.result);
        console.log(songList);

    });
    if (file) reader.readAsText(file);
});

async function makeChart() {
    // single / double 차트 선택을 확인
    let readDataPos = 0;
    let sel = document.querySelector("#chartSelect").value;
    if (sel == "single") readDataPos = 0;
    if (sel == "double") readDataPos = 3;
    

    for (let i = readDataPos; i < readDataPos + CATEGORY_TABLE.length; i++) {
        const b = document.querySelector(`.${CHART_POSITION_NAME[i%CATEGORY_TABLE.length]}`);
        b.replaceChildren();

        for (let j = 0; j < songList[i].length; j++) {
            let e = document.createElement('div');
            e.style = "width: 100px; height: 100px; display: inline-block; margin-left:5px;";
            e.innerHTML = `
                <h1 style="margin-top:0px; margin-left: 1px; position: absolute; color: white; font-size: 15px; z-index: 11; width: 95px; text-overflow:ellipsis; white-space: nowrap; overflow: hidden;">${songList[i][j]['name']}</h1>
                <h1 style="margin-top:15px; margin-left: 1px; position: absolute; color: ${DIFF_COLOR[songList[i][j]['diffName']]}; font-size: 15px; z-index: 11;">${songList[i][j]['diff']}</h1>
                <h1 style="margin-top:65px; width: 98px; position: absolute; color: white; font-size: 12px; text-align: right; z-index: 11;">#${j + 1}</h1>
                <h1 style="margin-top:80px; width: 98px; position: absolute; color: white; font-size: 20px; text-align: right; z-index: 11;">${songList[i][j]['flareSkill']}</h1>
                <img style="position:absolute; margin-top: 70px; z-index: 11;" src=${songList[i][j]['flareLv']}>
                <img class="song_img" style="position:absolute; width: 100px; height: 100px; filter: brightness(50%); z-index: 10;" 
                src=${songList[i][j]['img']}
                >
            `;
            b.append(e);
            console.log(DIFF_COLOR[songList[i][j]['diffName']]);
        }

        // 플레어 스킬곡 리스트를 다 안채웠을 떄 빈칸 매꿔주기
        for (let j = songList[i].length; j < 30; j++) {
            let e = document.createElement('div');
            e.style = "width: 100px; height: 100px; display: inline-block; background-color: darkgray; margin-left:5px;";
            e.innerHTML = `
                <h1 style="margin-top:39px; margin-left:25px; position: absolute; color: white; font-size: 15px;">no data</h1>
            `;
            b.append(e);
        }
    }
}