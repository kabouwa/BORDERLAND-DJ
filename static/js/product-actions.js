//Deleted product via api : 
async function deletePro(id) {
    try{
        const response = await fetch(`/api/del-product/?idel=${id}`);
        const data = await response.json()
        if(data['deleted'] == true){
            location.href = `/kabouwa/products/?statut=delete`;
        }
    }catch(e){
        console.error("deleting failed :", e);
    }
}

const confirmModal = document.querySelector(".confirm-modal");
let product_del_id = null

//Confirm deleting : 
document.querySelectorAll(".delete-btn").forEach((button)=>{
    button.addEventListener('click',()=>{
        product_del_id = button.getAttribute("data-product-id");
        confirmModal.setAttribute('style','display:grid')
    })
})

//Cancel deleting:
confirmModal.addEventListener("click", () => {
  confirmModal.setAttribute("style", "display:hidden");
});

//Confirm deleting
document.getElementById("confirm-deleting").addEventListener('click',()=>{
    deletePro(product_del_id);
})


//Start Update:
function toggleUpdate(){
    document.querySelectorAll(".update-btn").forEach((button) => {
    button.addEventListener("click", () => {
        let product_up_id = button.getAttribute("data-product-id");
        location.pathname = `/kabouwa/update-product/${product_up_id}`
    });
    });
};toggleUpdate()
