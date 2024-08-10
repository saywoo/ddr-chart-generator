(async function() {
	const BASE_URL = "https://p.eagate.573.jp/game/ddr/ddrworld/playdata/";
    const FLARE_SINGLE_PATH = "flare_data_single.html";
    const FLARE_DOUBLE_PATH = "flare_data_double.html";

    const CATEGORY_TABLE = [".flareskill_classic_table", ".flareskill_white_table", ".flareskill_gold_table"];
    const CATEGORY_NAME = ["classic", "white", "gold"];

	async function fetchDoc(url) {
		return new DOMParser().parseFromString(await (await fetch(url)).text(), "text/html");
	};

    const dataPage = await fetchDoc(BASE_URL + FLARE_SINGLE_PATH);

    for (let i = 0; i < CATEGORY_TABLE.length; i++) {
        let matches = dataPage.querySelectorAll(CATEGORY_TABLE[i]);

        for (let j = 0; j < matches.length; j++) {
            let songInfo = matches[j].querySelectorAll("td");

            let songName = songInfo[0].querySelector("a").textContent;
            let songImg = songInfo[0].querySelector("img").src;
            // 작은 이미지에서 큰 이미지로 변경
            songImg.replace("kind=2", "kind=1");

            let tmp = songInfo[1].innerHTML.split("<br>");
            let songDiff = tmp[0];
            let songLv = tmp[1];
            
            let songFlareLv = songInfo[2].querySelector("img").src;
            let songFlareSkill = songInfo[3].textContent;

            console.log(songName);
            console.log(songImg);
            console.log(songDiff);
            console.log(songLv);
            console.log(songFlareLv);
            console.log(songFlareSkill);
        }
    }

})();

