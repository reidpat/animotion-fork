<script>
	import { onDestroy, onMount } from 'svelte'
	import { browser } from '$app/environment'

	let debounceTimer
	let meta

	function debounce(func, delay) {
		return (...args) => {
			clearTimeout(debounceTimer)
			debounceTimer = setTimeout(() => func(...args), delay)
		}
	}

	let prevTarget

	function validTarget(target) {
		return (
			target?.nodeType === Node.ELEMENT_NODE &&
			target.tagName.toLowerCase() !== 'body' &&
			target.tagName.toLowerCase() !== 'html' &&
			target.getAttribute('file')?.includes('slides') &&
			target.textContent.trim() !== ''
		)
	}

	function getMeta(target) {
		let _meta = {
			file: target.getAttribute('file'),
			start: target.getAttribute('start'),
			end: target.getAttribute('end'),
            line: target.getAttribute('line'),
            column: target.getAttribute('column'),
			tag: target.tagName.toLowerCase()
		}
		let fileSplit = _meta.file.split('/')
		let shortFile = fileSplit[fileSplit.length - 2] + '/' + fileSplit[fileSplit.length - 1]
		// console.log(shortFile)
		_meta = { ..._meta, shortFile }
		return _meta
	}

	const debouncedMouseMove = debounce((event) => {
		let target = event.target
		// Check if the target is a meaningful DOM element (not body, html, or empty text nodes)
		if (validTarget(target)) {
			meta = getMeta(target)
			let position = target.getBoundingClientRect()
			editLocation = {
				top: position.top + window.scrollY,
				left: position.left + window.scrollY
			}
		} else {
			meta = null
		}
	}, 1) // 100ms delay

	let activeElement;
    let activeMeta;

	function setActive(target) {
		activeElement = event.target
        activeMeta = getMeta(activeElement);
		activeElement.classList.add('border-solid')
		activeElement.classList.add('border-2')
		activeElement.classList.add('border-sky-500')
	}

	function removeActive(target) {
		activeElement.classList.remove('border-solid')
		activeElement.classList.remove('border-2')
		activeElement.classList.remove('border-sky-500')
        activeMeta = null;
		activeElement = null
	}

	function onClick(event) {
		if (event.target == activeElement) {
			window.location = `vscode://file/${activeMeta.file}:${activeMeta.line}:${activeMeta.column}`
		}
		if (meta && validTarget(event.target)) {
			setActive(event.target)
		} else {
			removeActive(event.target)
		}
	}

	onMount(() => {
		if (browser) {
			document.body.addEventListener('click', onClick, true)
			document.body.addEventListener('mousemove', debouncedMouseMove)
		}
	})

	onDestroy(() => {
		if (browser) {
			document.body.removeEventListener('click', onClick, true)
			document.body.removeEventListener('mousemove', debouncedMouseMove)
			clearTimeout(debounceTimer)
		}
	})

	let editLocation
</script>

{#if meta}
	<div
		style="position: absolute; top:{editLocation.top - 20}px; left: {editLocation.left}px;"
		class="z-10 bg-slate-500"
	>
		&lt;{meta.tag}&gt; {meta.shortFile}
	</div>
{/if}
<slot />
