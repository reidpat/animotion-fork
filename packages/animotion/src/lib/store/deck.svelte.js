// eslint-disable-next-line no-undef
let slides = $state();

export function setPresentation(reveal) {
	slides = reveal
}

export function getPresentation() {
	return {
		get slides() {
			return slides
		}
	}
}