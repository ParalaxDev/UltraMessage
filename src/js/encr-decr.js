
function encrypt(clear, clientSecret){
// encrypt() : encrypt the given clear text

  var cipher = CryptoJS.AES.encrypt(clear, clientSecret);
  cipher = cipher.toString();
  return cipher;
}

function decrypt(cipher, clientSecret) {
// decrypt() : decrypt the given cipher text

  var decipher = CryptoJS.AES.decrypt(cipher, clientSecret);
  decipher = decipher.toString(CryptoJS.enc.Utf8);
  return decipher;
}

// TEST - ENCRYPT
//var cipher = crypt.encrypt("sthethsehjyrdyjfyyjsfyjsdyj");
//console.log(cipher);

// TEST - DECRYPT
//var decipher = crypt.decrypt(cipher);
//console.log(decipher);