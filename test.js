(async function() {
	const BASE_URL = "https://p.eagate.573.jp/game/ddr/ddrworld/playdata/";
    const FLARE_SINGLE_PATH = "flare_data_single.html";
    const FLARE_DOUBLE_PATH = "flare_data_double.html";
	const LIMIT = 150;

	const data = {
		profile: "",
		skill_list: [],
		musicdata_list: []
	};

	const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

	const fetchHTML = async (url, referer_url) => {
		const response = await fetch(url, {cache: "no-store", referrer: referer_url, credentials: "include"});
		if (!response.ok) {
			throw new Error(`Network response was not ok: ${response.statusText}`);
		}
        else {
            console.log("OK");
        }
		return response.text();
	};

	const getSingleData = async (page) => {
		const url = `${BASE_URL}${FLARE_SINGLE_PATH}`;
		return fetchHTML(url, BASE_URL + FLARE_SINGLE_PATH);
	};

    const dataPage = await getSingleData(BASE_URL + FLARE_SINGLE_PATH);
    console.log(dataPage);

})();

