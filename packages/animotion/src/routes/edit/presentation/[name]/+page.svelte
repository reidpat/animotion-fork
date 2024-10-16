<script>
	import DynamicSlide from '$lib/components/DynamicSlide.svelte'
	import Editor from '$lib/components/editor.svelte'
	import Overview from '$lib/components/overview.svelte'
	import { Presentation, Slide } from '$lib/index.js'
	import { getPresentation } from '$lib/store/deck.svelte.js'
	import { onMount } from 'svelte'

	let slides = []

	let reveal

	export let data

	async function loadSlides() {
		slides = data.presentation.slides
		console.log(slides)
	}

	let presentation
	let overview = false

	onMount(() => {
		console.log(data)
		presentation = getPresentation()
		console.log(presentation)
		loadSlides()
	})

	let overviewSlideHeight, overviewSlideWidth

	function toggleOverview() {
		if (overview) {
			deactivate()
		} else {
			activate()
		}
		overview = !overview
	}

	function activate() {
		presentation.slides.getRevealElement().classList.add('overview')
		presentation.slides.getSlidesElement().appendChild(presentation.slides.getBackgroundsElement())
		const margin = 70
		const slideSize = presentation.slides.getComputedSlideSize()
		overviewSlideWidth = slideSize.width + margin
		overviewSlideHeight = slideSize.height + margin

		layout()
		update()
	}

	const SLIDES_SELECTOR = '.slides section'

	function deactivate() {
		// Only proceed if enabled in config

		presentation.slides.getRevealElement().classList.remove('overview')

		presentation.slides.getRevealElement().classList.add('overview-deactivating')

		setTimeout(() => {
			presentation.slides.getRevealElement().classList.remove('overview-deactivating')
		}, 1)

		// Move the background element back out
		presentation.slides.getRevealElement().appendChild(presentation.slides.getBackgroundsElement())

		// Clean up changes made to slides
		queryAll(presentation.slides.getRevealElement(), SLIDES_SELECTOR).forEach((slide) => {
			transformElement(slide, '')

			// slide.removeEventListener('click', this.onSlideClicked, true)
		})

		// Clean up changes made to backgrounds
		queryAll(presentation.slides.getBackgroundsElement(), '.slide-background').forEach(
			(background) => {
				transformElement(background, '')
			}
		)

		transformSlides({ overview: '' })

		const indices = presentation.slides.getIndices()

		// presentation.slides.slide(indices.h, indices.v)
		presentation.slides.layout()
		// presentation.slides.cueAutoSlide()
	}

	let slidesTransform = { layout: '', overview: '' }

	function transformSlides(transforms) {
		// Pick up new transforms from arguments
		if (typeof transforms.layout === 'string') slidesTransform.layout = transforms.layout
		if (typeof transforms.overview === 'string') slidesTransform.overview = transforms.overview

		// Apply the transforms to the slides container
		if (slidesTransform.layout) {
			transformElement(
				presentation.slides.getSlidesElement(),
				slidesTransform.layout + ' ' + slidesTransform.overview
			)
		} else {
			transformElement(presentation.slides.getSlidesElement(), slidesTransform.overview)
		}
	}

	function update() {
		const vmin = Math.min(window.innerWidth, window.innerHeight)
		const scale = Math.max(vmin / 5, 150) / vmin
		const indices = presentation.slides.getIndices()

		transformSlides({
			overview: [
				'scale(' + scale + ')',
				'translateX(' + -indices.h * overviewSlideWidth + 'px)',
				'translateY(' + -indices.v * overviewSlideHeight + 'px)'
			].join(' ')
		})
	}

	const queryAll = (el, selector) => {
		return Array.from(el.querySelectorAll(selector))
	}

	const transformElement = (element, transform) => {
		element.style.transform = transform
	}

	function layout() {
		// Layout slides
		presentation.slides.getHorizontalSlides().forEach((hslide, h) => {
			hslide.setAttribute('data-index-h', h)
			transformElement(hslide, 'translate3d(' + h * overviewSlideWidth + 'px, 0, 0)')

			if (hslide.classList.contains('stack')) {
				queryAll(hslide, 'section').forEach((vslide, v) => {
					vslide.setAttribute('data-index-h', h)
					vslide.setAttribute('data-index-v', v)

					transformElement(vslide, 'translate3d(0, ' + v * overviewSlideHeight + 'px, 0)')
				})
			}
		})

		// Layout slide backgrounds
		Array.from(presentation.slides.getBackgroundsElement().childNodes).forEach((hbackground, h) => {
			transformElement(hbackground, 'translate3d(' + h * overviewSlideWidth + 'px, 0, 0)')

			queryAll(hbackground, '.slide-background').forEach((vbackground, v) => {
				transformElement(vbackground, 'translate3d(0, ' + v * overviewSlideHeight + 'px, 0)')
			})
		})
	}
</script>

{#if slides.length}
	<Editor bind:overview>
		<button on:click={toggleOverview}>Overview</button>
		<Presentation
			options={{ history: true, transition: 'slide', controls: false, progress: true, reload: true }}
		>
			{#each slides as group}
				<Slide>
					{#each group as slide}
						<DynamicSlide slidePath={slide.path} />
					{/each}
				</Slide>
			{/each}
		</Presentation>
	</Editor>
{/if}
