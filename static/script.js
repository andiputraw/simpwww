// deno-lint-ignore-file
// language selector
/**
 * @type {HTMLSelectElement | null}
 */
const langSelector = document.getElementById("lang-selector")

langSelector.addEventListener('input', () => {
    const url = new URL(window.location)
    url.searchParams.set("lang", langSelector.value)
    window.location = url
})

// Hamburger menu for mobile
const toggle = document.getElementById('menu-toggle')
const menu = document.getElementById('menu-mobile')

toggle.addEventListener('click', () => {
    menu.classList.toggle('hidden')
})

// Blog Tag
/**
 * @type {HTMLCollectionOf<HTMLParagraphElement>}
 */
const tags = document.getElementsByClassName('blog-tags')
for(const tag of tags) {
    tag.addEventListener('click', () => {
        
        const url = new URL(window.location)
        url.searchParams.set("tag", tag.innerText)
        window.location = url
    })
}