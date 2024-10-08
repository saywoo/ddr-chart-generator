(async function() {
	const BASE_URL = "https://p.eagate.573.jp/game/ddr/ddrworld/playdata/";
    const FLARE_SINGLE_PATH = "flare_data_single.html";
    const FLARE_DOUBLE_PATH = "flare_data_double.html";
    const PROFILE_PATH = "index.html";

    const CATEGORY_TABLE = [".flareskill_classic_table", ".flareskill_white_table", ".flareskill_gold_table"];
    const CATEGORY_NAME = ["classic", "white", "gold"];

    // 각 난이도별 색깔
    const DIFF_COLOR = {"BEGINNER": "rgb(0, 255, 255)", "BASIC": "rgb(255, 255, 0)", "DIFFICULT": "rgb(255, 0, 0)", "EXPERT": "rgb(173, 255, 47)", "CHALLENGE": "rgb(238, 130, 238)"};

	async function fetchDoc(url) {
		return new DOMParser().parseFromString(await (await fetch(url)).text(), "text/html");
	};

    // [ (single)classic, white, gold, (double)classic, white, gold, profileInfo ] 곡 리스트
    var songList = [[], [], [], [], [], [], []];

    // user 데이터 파싱
    var playerDataPage = await fetchDoc(BASE_URL + PROFILE_PATH);
    var playerDataMatch = playerDataPage.querySelectorAll("td");
    var playerData = {};

    // 유저 데이터 파싱
    playerData["name"] = playerDataMatch[0].textContent;
    playerData["ddrcode"] = playerDataMatch[1].textContent;
    playerData["lastPlay"] = playerDataMatch[4].textContent.slice(0, 10);

    playerData["singleTier"] = playerDataMatch[5].textContent;
    playerData["doubleTier"] = playerDataMatch[6].textContent;
    playerData["singleRating"] = playerDataMatch[7].textContent;
    playerData["doubleRating"] = playerDataMatch[8].textContent;

    // category별 레이팅 파싱
    for (let i = 0; i < 3; i++) {
        let tmp = playerDataMatch[i*2+9].textContent.split(" ");
        playerData["single" + CATEGORY_NAME[i].charAt(0).toUpperCase() + CATEGORY_NAME[i].slice(1) + "Rating"] = tmp[0];
        playerData["single" + CATEGORY_NAME[i].charAt(0).toUpperCase() + CATEGORY_NAME[i].slice(1) + "SongCount"] = tmp[1].slice(1);

        tmp = playerDataMatch[i*2+10].textContent.split(" ");
        playerData["double" + CATEGORY_NAME[i].charAt(0).toUpperCase() + CATEGORY_NAME[i].slice(1) + "Rating"] = tmp[0];
        playerData["double" + CATEGORY_NAME[i].charAt(0).toUpperCase() + CATEGORY_NAME[i].slice(1) + "SongCount"] = tmp[1].slice(1);
    }

    songList[6].push(playerData);

    // single 데이터 파싱
    var singleDataPage = await fetchDoc(BASE_URL + FLARE_SINGLE_PATH);

    // double 데이터 파싱
    var doubleDataPage = await fetchDoc(BASE_URL + FLARE_DOUBLE_PATH);

    for (let i = 0; i < CATEGORY_TABLE.length * 2; i++) {
        let matches;
        if (i < CATEGORY_TABLE.length) {
            matches = singleDataPage.querySelectorAll(CATEGORY_TABLE[i%CATEGORY_TABLE.length]);
        }
        else {
            matches = doubleDataPage.querySelectorAll(CATEGORY_TABLE[i%CATEGORY_TABLE.length]);
        }

        for (let j = 0; j < matches.length; j++) {
            // 곡 정보를 파싱해서 songList에 저장
            let songInfo = matches[j].querySelectorAll("td");

            let songName = songInfo[0].querySelector("a").textContent;

            let songImg = songInfo[0].querySelector("img").src;
            songImg = songImg.replace("kind=2", "kind=1");      // 작은 이미지에서 큰 이미지로 변경

            let tmp = songInfo[1].innerHTML.split("<br>");
            let songDiff = tmp[0].slice(0, 1) + "SSSDDD"[i] + "P " + tmp[1].slice(3);    // 'ESP 14' 혹은 'EDP 14' 형태로 가공
            
            let songFlareLv = songInfo[2].querySelector("img").src;
            if (songFlareLv.includes("none") == true) songFlareLv = "";     // 플레어 게이지로 클리어하지 않았을 때

            let songFlareSkill = songInfo[3].textContent;

            songList[i].push({'name':songName, 'img':songImg, 'diff':songDiff, 'diffName':tmp[0], 'flareLv':songFlareLv, 'flareSkill':songFlareSkill});
        }
    }

    console.log(songList);

    // json 파일로 변환 후 다운로드
    const blob = new Blob([JSON.stringify(songList)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `aa.json`;
    a.click();

})();
