//Search by title
document.getElementById("search-form").addEventListener("submit", async (sumbit) => {
    sumbit.preventDefault()
    try {
        const response = await fetch(`/api/searchProducts/?search=${search.value}`);
        const data = await response.json();

        showPro(data["productsFounded"]);
        toggleUpdate();
    } catch (e) {
        console.error("Search Faild: ", e);
    }
});

