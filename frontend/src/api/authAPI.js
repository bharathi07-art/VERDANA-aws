const BASE_API = "/api/auth";

export  async function loginAdmin(username, password){
    const res = await fetch(`${BASE_API}/login`,{
        method:'POST',
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({username, password}),
    });

    if(!res.ok){
        const errData = await res.json().catch(()=>({}));
        throw new Error(errData.error || "add Product failed");
    }
    
    return res.json();
}

