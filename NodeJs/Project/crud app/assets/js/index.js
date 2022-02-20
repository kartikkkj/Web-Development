$('#add_user').submit((event)=>{
    alert("Data inserted")
})



$('#update-user').submit((event)=>{
    event.preventDefault();
    const unindexed_array = $("#update-user").serializeArray();
    const data ={}
    $.map(unindexed_array,(n,l)=>{
        data[n["name"]]=n["value"];
    })  
    console.log(data)
    const request = { 
        "url":`http://localhost:3000/api/users/${data.id}`,
        "method":"PUT",
        "data":data,
    }
    $.ajax(request).done((res)=>{
        alert("Data Updated")
    }) 
})
 
if(window.location.pathname=="/"){
    $ondelete = $(".table tbody td a.delete")
    $ondelete.click(()=>{
        const id = $($ondelete).attr("data-id")
        const request = {
            "url":`http://localhost:3000/api/users/${id}`,
            "method":"DELETE",
        }
        if(confirm("Are you want to delete this data")){
            $.ajax(request).done((res)=>{
                alert("Data Deleted")
                location.reload()
            }) 
        }
    
    })
}