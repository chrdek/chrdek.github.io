class ValidateInput {
 constructor(response_val) {
   this.testdata = response_val;
   this.jsonPattern = '/(\|{\[){1,}|(\}|\]){1,}/g';
 }

this.isXmlorJs = (this.testdata) => Boolean((new DOMParser().parseFromString(this.testdata,'application/xml').querySelector('parsererror') != undefined) & (JSON.stringify(this.testdata).match(this.jsonPattern) != null))
? 'JSON' : 'XML';

}