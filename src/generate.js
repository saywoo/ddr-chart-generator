(async function() {
	const BASE_URL = "https://p.eagate.573.jp/game/ddr/ddrworld/playdata/";
    const FLARE_SINGLE_PATH = "flare_data_single.html";
    const FLARE_DOUBLE_PATH = "flare_data_double.html";

    const CATEGORY_TABLE = [".flareskill_classic_table", ".flareskill_white_table", ".flareskill_gold_table"];
    const CATEGORY_NAME = ["classic", "white", "gold"];

    // 각 난이도별 색깔
    const DIFF_COLOR = {"BEGINNER": "rgb(0, 255, 255)", "BASIC": "rgb(255, 255, 0)", "DIFFICULT": "rgb(255, 0, 0)", "EXPERT": "rgb(173, 255, 47)", "CHALLENGE": "rgb(238, 130, 238)"};

	async function fetchDoc(url) {
		return new DOMParser().parseFromString(await (await fetch(url)).text(), "text/html");
	};

    // [ classic, white, gold ] 곡 리스트
    var singleSongList = [[], [], []];
    var doubleSongList = [[], [], []];

    // single 데이터 파싱
    var dataPage = await fetchDoc(BASE_URL + FLARE_SINGLE_PATH);

    for (let i = 0; i < CATEGORY_TABLE.length; i++) {
        let matches = dataPage.querySelectorAll(CATEGORY_TABLE[i]);

        for (let j = 0; j < matches.length; j++) {
            // 곡 정보를 파싱해서 songList에 저장
            let songInfo = matches[j].querySelectorAll("td");

            let songName = songInfo[0].querySelector("a").textContent;

            let songImg = songInfo[0].querySelector("img").src;
            songImg = songImg.replace("kind=2", "kind=1");      // 작은 이미지에서 큰 이미지로 변경

            let tmp = songInfo[1].innerHTML.split("<br>");
            let songDiff = tmp[0].slice(0, 1) + "SP " + tmp[1].slice(3);    // 'ESP 14' 형태로 가공
            
            let songFlareLv = songInfo[2].querySelector("img").src;
            if (songFlareLv.includes("none") == true) songFlareLv = "";     // 플레어 게이지로 클리어하지 않았을 때

            let songFlareSkill = songInfo[3].textContent;

            singleSongList[i].push({'name':songName, 'img':songImg, 'diff':songDiff, 'diffName':tmp[0], 'flareLv':songFlareLv, 'flareSkill':songFlareSkill});
        }
    }
    console.log(singleSongList);


    // double 데이터 파싱
    var dataPage = await fetchDoc(BASE_URL + FLARE_DOUBLE_PATH);

    for (let i = 0; i < CATEGORY_TABLE.length; i++) {
        let matches = dataPage.querySelectorAll(CATEGORY_TABLE[i]);

        for (let j = 0; j < matches.length; j++) {
            // 곡 정보를 파싱해서 songList에 저장
            let songInfo = matches[j].querySelectorAll("td");

            let songName = songInfo[0].querySelector("a").textContent;

            let songImg = songInfo[0].querySelector("img").src;
            songImg = songImg.replace("kind=2", "kind=1");                  // 작은 이미지에서 큰 이미지로 변경

            let tmp = songInfo[1].innerHTML.split("<br>");
            let songDiff = tmp[0].slice(0, 1) + "SP " + tmp[1].slice(3);    // 'ESP 14' 형태로 가공
            
            let songFlareLv = songInfo[2].querySelector("img").src;
            if (songFlareLv.includes("none") == true) songFlareLv = "";     // 플레어 게이지로 클리어하지 않았을 때

            let songFlareSkill = songInfo[3].textContent;

            doubleSongList[i].push({'name':songName, 'img':songImg, 'diff':songDiff, 'diffName':tmp[0], 'flareLv':songFlareLv, 'flareSkill':songFlareSkill});
        }
    }
    console.log(doubleSongList);

    const uiBase = document.body.appendChild(document.createElement("div"));

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < singleSongList[i].length; j++) {
            let e = document.createElement('div');
            e.style = "width: 100px; height: 100px; display: inline-block; margin-left:5px;";
            e.innerHTML = `
                <h1 style="margin-top:0px; margin-left: 1px; position: absolute; color: white; font-size: 15px; z-index: 11; width: 95px; text-overflow:ellipsis; white-space: nowrap; overflow: hidden;">${singleSongList[i][j]['name']}</h1>
                <h1 style="margin-top:15px; margin-left: 1px; position: absolute; color: ${DIFF_COLOR[singleSongList[i][j]['diffName']]}; font-size: 15px; z-index: 11;">${singleSongList[i][j]['diff']}</h1>
                <h1 style="margin-top:65px; width: 98px; position: absolute; color: white; font-size: 12px; text-align: right; z-index: 11;">#${j + 1}</h1>
                <h1 style="margin-top:80px; width: 98px; position: absolute; color: white; font-size: 20px; text-align: right; z-index: 11;">${singleSongList[i][j]['flareSkill']}</h1>
                <img style="position:absolute; margin-top: 70px; z-index: 11;" src=${singleSongList[i][j]['flareLv']}>
                <img class="song_img" style="position:absolute; width: 100px; height: 100px; filter: brightness(50%); z-index: 10;" 
                src=${singleSongList[i][j]['img']}
                >
            `;
            uiBase.append(e);
        }

        // 플레어 스킬곡 리스트를 다 안채웠을 떄 빈칸 매꿔주기
        for (let j = singleSongList[i].length; j < 30; j++) {
            let e = document.createElement('div');
            e.style = "width: 100px; height: 100px; display: inline-block; background-color: darkgray; margin-left:5px;";
            e.innerHTML = `
                <h1 style="margin-top:39px; margin-left:25px; position: absolute; color: white; font-size: 15px;">no data</h1>
            `;
            uiBase.append(e);
        }
    }
})();
