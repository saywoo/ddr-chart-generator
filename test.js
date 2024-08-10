(async function() {
	const BASE_URL = "https://p.eagate.573.jp/game/ddr/ddrworld/playdata/";
    const FLARE_SINGLE_PATH = "flare_data_single.html";
    const FLARE_DOUBLE_PATH = "flare_data_double.html";
	const LIMIT = 150;

	const fetchHTML = async (url) => {
        return new DOMParser().parseFromString(await (await fetch(url)).text(), "text/html");
	};

	const getSingleData = async (page) => {
		return fetchHTML(page);
	};

    const dataPage = await getSingleData(BASE_URL + FLARE_SINGLE_PATH);
    console.log(dataPage);

})();

