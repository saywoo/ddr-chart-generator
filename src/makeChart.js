const CHART_POSITION_NAME = ["chart-classic", "chart-white", "chart-gold"];
const CATEGORY_TABLE = [".flareskill_classic_table", ".flareskill_white_table", ".flareskill_gold_table"];
const CATEGORY_NAME = ["classic", "white", "gold"];

// 각 난이도별 색깔
const DIFF_COLOR = {"BEGINNER": "rgb(0, 255, 255)", "BASIC": "rgb(255, 255, 0)", "DIFFICULT": "rgb(255, 0, 0)", "EXPERT": "rgb(173, 255, 47)", "CHALLENGE": "rgb(238, 130, 238)"};

let songList;

document.getElementById("data-load").addEventListener("change", function (e) {
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
    let sel = document.querySelector("#chart-select").value;
    if (sel == "single") readDataPos = 0;
    if (sel == "double") readDataPos = 3;

    // chart를 보이게 변경
    document.querySelector(".chart").style = "display = block;";

    // 유저 데이터를 차트에 표시
    document.querySelector(".dancer-name").textContent = songList[6][0]["name"];
    document.querySelector(".ddr-code").textContent = songList[6][0]["ddrcode"];
    document.querySelector(".user-rating").textContent = songList[6][0][sel + "Rating"];
    document.querySelector(".user-tier").textContent = songList[6][0][sel + "Tier"];

    for (let i = readDataPos; i < readDataPos + CATEGORY_TABLE.length; i++) {
        const b = document.querySelector(`.${CHART_POSITION_NAME[i%CATEGORY_TABLE.length]}`);
        b.replaceChildren();
        let e = document.createElement('div');
        e.className = "chart-category";
        e.innerHTML = `
            <h1 class="chart-category-title">${CATEGORY_NAME[i%CATEGORY_TABLE.length]}</h1>
        `;
        b.append(e);

        for (let j = 0; j < songList[i].length; j++) {
            let e = document.createElement('div');
            e.className = "chart-song-block";
            e.innerHTML = `
                <h1 class="chart-song-name">${songList[i][j]['name']}</h1>
                <h1 class="chart-song-diff" style="color: ${DIFF_COLOR[songList[i][j]['diffName']]};">${songList[i][j]['diff']}</h1>
                <h1 class="chart-song-index">#${j + 1}</h1>
                <h1 class="chart-song-flareskill">${songList[i][j]['flareSkill']}</h1>
                <img class="chart-song-flarelv" src=${songList[i][j]['flareLv']}>
                <img class="chart-song-img" src=${songList[i][j]['img']}>
            `;
            b.append(e);
        }

        // 플레어 스킬곡 리스트를 다 안채웠을 떄 빈칸 매꿔주기
        for (let j = songList[i].length; j < 30; j++) {
            let e = document.createElement('div');
            e.className = "chart-song-block";
            e.style = "background-color: darkgray; z-index: 11;";
            e.innerHTML = `
                <h1 class="chart-nodata">NO data</h1>
            `;
            b.append(e);
        }
    }
}