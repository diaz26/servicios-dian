export const makeErrors = (errors: any[]) => {
  let response: any = {}
  let errorSet, errorName, errorMsj
  
  for (let error in errors) {
    // elimina el json. del nombre
    errorSet = error.split("json.");
    errorName = errorSet[errorSet.length > 1 ? 1 : 0];
    
    errorMsj = errors[error].message

    // setea el mensaje de error sobre el tipo de dato fecha
    errorMsj.indexOf("Cast to date failed") !== -1 ? errorMsj = 'Tipo de dato inválido, formato fecha esperado: yyyy-mm-dd' : errorMsj;

    // setea el mensaje de error sobre el tipo de dato fecha
    errorMsj.indexOf("Cast to Number failed") !== -1 ? errorMsj = 'Tipo de dato inválido, se espera un número' : errorMsj;


    response[errorName] = errorMsj
  }
  return { errors: response }
}
