import { readFileSync } from "fs";
import randomcolor from "randomcolor";
import contrast from "color-contrast";

const randomArrKey = items => items[Math.floor(Math.random() * items.length)];
const wordList = readFileSync(__dirname + "/../words/nouns.txt", "utf-8")
	.split("\n")
	.filter(Boolean);

const postLayouts = ["normal", "inverted", "colorful"];
const layouts = ["left", "right", "vertical"];
const wordLogos = ["bold", "regular", "caps", "smol"];
const logos = ["square", "square", "round", "app"];
const fonts = ["Roboto", "Knewave", "Montserrat", "segoe", "Open Sans"];
const logoFonts = ["Roboto", "segoe", "Open Sans"];

const buildUpFanta = $script => {
	//word
	let word = randomArrKey(wordList);
	word = word.charAt(0).toUpperCase() + word.slice(1);
	$script.querySelectorAll("x-script-word").forEach($el => {
		$el.innerText = word;
	});
	$script.querySelectorAll("x-script-logo").forEach($el => {
		$el.innerText = `${word[0]}S`;
	});

	//dataset
	const layout = randomArrKey(layouts);
	const wordLogo = randomArrKey(wordLogos);
	const logo = randomArrKey(logos);
	const outlines = Math.random() > 0.7;

	$script.dataset.layout = layout;
	$script.dataset.wordLogo = wordLogo;
	$script.dataset.logo = logo;
	$script.dataset.outlines = outlines;

	//props
	const postLayout = randomArrKey(postLayouts);
	const font = randomArrKey(fonts);
	const logoFont = randomArrKey(logoFonts);
	const color = randomcolor({ seed: word });
	const textColor = contrast(color, "#000") > 7 ? "#000" : "#fff";

	document.documentElement.style.setProperty("--font", font);
	document.documentElement.style.setProperty("--logo-font", logoFont);

	document.documentElement.style.setProperty("--main", color);
	document.documentElement.style.setProperty("--contrast", textColor);

	if (postLayout === "inverted") {
		document.documentElement.style.setProperty("--bg", color);
		document.documentElement.style.setProperty("--main", textColor);
		document.documentElement.style.setProperty("--text", textColor);
		document.documentElement.style.setProperty("--contrast", color);
	}

	if (postLayout === "colorful") {
		document.documentElement.style.setProperty("--text", color);
		document.documentElement.style.setProperty("--bg", textColor);
	}

	const tweet = `${word}Script`;

	return { word, tweet };
};

const go = () => {
	const $script = document.querySelector("x-script");
	const data = buildUpFanta($script, data);

	console.log(JSON.stringify(data));
};
go();
