const { createHash } = require("crypto");

function computeHash(string) {
    let hash = createHash("sha256");
    hash.write(string);
    return hash.digest("base64");
}

module.exports = computeHash;
