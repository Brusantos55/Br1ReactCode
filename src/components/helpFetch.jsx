export const helpHttp = () => {
  const getMaterials = (page, pageSize, filter) => {
    
    let url = `http://192.168.0.30:8080/snc-mf-api/v1/clients/1/materialGenerics/search?page=${page}&size=${pageSize}`;

    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        ...filter,
      }),
    })
      .then(function (resp) {
        return resp.json();
      })

      .catch(function (error) {
        console.log(error);
      });


  };

  const postMaterials = (addBody) => {
    let url = `http://192.168.0.30:8080/snc-mf-api/v1/clients/1/materialGenerics`;

    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId:1,
        ...addBody
      }),
    })
      .then(function (resp) {
        if(resp.ok){
          alert('Procedure added successfuly')
        } 
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const delMaterials = (idp) => {
    // solo borra las que he añadido yo
    let url = `http://192.168.0.30:8080/snc-mf-api/v1/clients/1/materialGenerics/${idp}`;

    return fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
  };

  const putMaterials = (options) => {
    
    let url = `http://192.168.0.30:8080/snc-mf-api/v1/clients/1/materialGenerics/${options.id}`;

    return fetch(url, {
        method: "PUT",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...options,
        }),
    })
        .then(function (resp) {
          if(resp.ok) 
            alert('Procedure updated successfuly')
        })
        .catch(function (error) {
        console.log(error);
        });
  };

  //Componentes

  const getComp = (idM) => {
    
    let url = `http://192.168.0.30:8080/snc-mf-api/v1/clients/1/materials/${idM}/components`;

    return fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then(function (resp) {
      return resp.json();
    })

    .then(function (json) {
       return(json);
    })
      .catch(function (error) {
        console.log(error);
      });
  };

  const postComp = (idm, body) => {
    let url = `http://192.168.0.30:8080/snc-mf-api/v1/clients/1/materials/${idm}/components`;

    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })
      .then(function (resp) {
        if(resp.ok){
          alert('Componentes Actualizados!')
        } 
      })
      .catch(function (error) {
        console.log(error);
      });
    };

    const getTags = (idM) => {
    
      let url = `http://192.168.0.30:8080/snc-mf-api/v1/clients/1/materials/${idM}/tags`;
  
      return fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then(function (resp) {
        return resp.json();
      }).catch(function (error) {
        console.log(error);
      });
    };
  
  return {
    getMaterials,
    getComp,
    getTags,
    postMaterials,
    postComp,
    putMaterials,
    delMaterials,
  }; 
}