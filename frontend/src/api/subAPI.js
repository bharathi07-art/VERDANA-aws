const SUB_BASE="/api/user/newSub";

export async function newSub(email){
    const res = await fetch(SUB_BASE,{
        method:"POST",
        headers:{
            "Content-type" : "application/json",
        },
        body:JSON.stringify({email})
    })

    if(!res.ok){
        const  errData = await res.json().catch(()=>{});
        throw new Error(errData || "Failed to subscribe");
    }

    return res.json();

}