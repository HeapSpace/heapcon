const util = require("./fns/util");

const SPEAKERS_DIR_PATH = "content/speakers";
const TALKS_DIR_PATH = "content/talks";

util.cleanup(SPEAKERS_DIR_PATH);
util.cleanup(TALKS_DIR_PATH);
