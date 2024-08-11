(async function() {
	const BASE_URL = "https://p.eagate.573.jp/game/ddr/ddrworld/playdata/";
    const FLARE_SINGLE_PATH = "flare_data_single.html";
    const FLARE_DOUBLE_PATH = "flare_data_double.html";

    const CATEGORY_TABLE = [".flareskill_classic_table", ".flareskill_white_table", ".flareskill_gold_table"];
    const CATEGORY_NAME = ["classic", "white", "gold"];
    
    const MAX_NAME_LENGTH = 15;

	async function fetchDoc(url) {
		return new DOMParser().parseFromString(await (await fetch(url)).text(), "text/html");
	};

    // [ classic, white, gold ] 곡 리스트
    var songList = [[], [], []];

    const dataPage = await fetchDoc(BASE_URL + FLARE_SINGLE_PATH);

    for (let i = 0; i < CATEGORY_TABLE.length; i++) {
        let matches = dataPage.querySelectorAll(CATEGORY_TABLE[i]);

        for (let j = 0; j < matches.length; j++) {
            // 곡 정보를 파싱해서 songList에 저장
            let songInfo = matches[j].querySelectorAll("td");

            let songName = songInfo[0].querySelector("a").textContent;

            if (songName.length >= MAX_NAME_LENGTH) {
                songName = songName.slice(0, MAX_NAME_LENGTH) + "...";
            }

            let songImg = songInfo[0].querySelector("img").src;
            songImg = songImg.replace("kind=2", "kind=1");      // 작은 이미지에서 큰 이미지로 변경

            let tmp = songInfo[1].innerHTML.split("<br>");
            let songDiff = tmp[0].slice(0, 1) + "SP " + tmp[1].slice(3);    // 'ESP 14' 형태로 가공
            
            let songFlareLv = songInfo[2].querySelector("img").src;
            let songFlareSkill = songInfo[3].textContent;

            songList[i].push({'name':songName, 'img':songImg, 'diff':songDiff, 'flareLv':songFlareLv, 'flareSkill':songFlareSkill});
        }
    }

    console.log(songList);

})();

