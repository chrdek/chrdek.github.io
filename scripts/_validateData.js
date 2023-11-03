/*class ValidateInput {

 constructor(response_val) {
   this.testdata = response_val;
   this.jsonPattern = '/(\|{\[){1,}|(\}|\]){1,}/g';   
 }

static isXmlorJs() { return Boolean((new DOMParser().parseFromString(this.testdata,'application/xml').querySelector('parsererror') != undefined) || (JSON.stringify(this.testdata).match(this.jsonPattern) != null))
? 'JSON' : 'XML'
 }
}*/

const isXmlorJs = (res) => Boolean((new DOMParser().parseFromString(res,'application/xml').querySelector('parsererror') != undefined) || (JSON.stringify(res).match(/(\|{\[){1,}|(\}|\]){1,}/g) != null))
? 'JSON' : 'XML';