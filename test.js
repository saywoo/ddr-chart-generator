(async function() {
	const BASE_URL = "https://p.eagate.573.jp/game/ddr/ddrworld/playdata/";
    const FLARE_SINGLE_PATH = "flare_data_single.html";
    const FLARE_DOUBLE_PATH = "flare_data_double.html";

    const CATEGORY_TABLE = [".flareskill_classic_table", ".flareskill_white_table", ".flareskill_gold_table"];

	async function fetchDoc(url) {
		return new DOMParser().parseFromString(await (await fetch(url)).text(), "text/html");
	};

    const dataPage = await fetchDoc(BASE_URL + FLARE_SINGLE_PATH);

    for (let i = 0; i < CATEGORY_TABLE.length; i++) {
        let matches = dataPage.querySelectorAll(CATEGORY_TABLE[i]);

        for (let j = 0; j < matches.length; j++) {
            console.log(matches[i]);
        }
    }

    let matches = dataPage.querySelectorAll(".flareskill_classic_table");

    for (let i = 0; i < matches.length; i++) {
        let songInfo = matches[i].querySelectorAll("td");

        console.log(matches[i]);
    }
})();

